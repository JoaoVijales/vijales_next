'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useTransition } from '@/context/TransitionContext'

const ROUTE: THREE.Vector3[] = [
    new THREE.Vector3(  0, 0,   50),   // Hero     — CPU socket
    new THREE.Vector3( 60, 0, -170),   // Services — RAM slots
    new THREE.Vector3(-40, 0, -390),   // Portfolio — PCIe / chipset
    new THREE.Vector3( 10, 0, -610),   // Contact  — I/O panel
]
const SECTION_COUNT = ROUTE.length

const CAM_HEIGHT = 85
const CAM_BACK   = 55

const BOARD = { minX: -220, maxX: 220, minZ: -720, maxZ: 120, y: -30 }

export default function ThreeBackground() {
    const mountRef  = useRef<HTMLDivElement>(null)
    const { tunnelRef } = useTransition()

    useEffect(() => {
        if (!mountRef.current) return

        let scene:    THREE.Scene
        let camera:   THREE.PerspectiveCamera
        let renderer: THREE.WebGLRenderer
        let routeLine: THREE.Line
        const zoneMarkers: THREE.LineSegments[] = []
        const gridRunners: GridRunner[] = []
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const disposables: any[] = []

        let mouseX = 0
        let mouseY = 0
        let animationFrameId: number

        const focus = ROUTE[0].clone()
        let currentZone = 0
        let targetZone  = 0
        let prevPhase   = 'idle'

        // ── GridRunner — sinais viajando pela placa ───────────────────────────
        class GridRunner {
            yLevel:        number
            gridSize:      number
            baseSpeed:     number
            maxPathLength: number
            line:          THREE.Line
            pathHistory:   THREE.Vector3[]
            currentPos = new THREE.Vector3()
            targetPos  = new THREE.Vector3()
            isMoving   = false

            constructor(yLevel: number, gridSize: number, startZ: number) {
                this.yLevel        = yLevel + 0.1
                this.gridSize      = gridSize
                this.baseSpeed     = 3.5
                this.maxPathLength = 22

                const geo = new THREE.BufferGeometry()
                geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(this.maxPathLength * 3), 3))
                geo.setAttribute('color',    new THREE.BufferAttribute(new Float32Array(this.maxPathLength * 3), 3))
                const mat = new THREE.LineBasicMaterial({
                    vertexColors: true, transparent: true, opacity: 1.0,
                    blending: THREE.AdditiveBlending,
                })
                this.line = new THREE.Line(geo, mat)
                this.line.frustumCulled = false
                scene.add(this.line)
                this.pathHistory = []
                this.respawn(startZ)
            }

            respawn(forceZ?: number) {
                const startX = Math.floor((Math.random() - 0.5) * 8) * this.gridSize
                const z = forceZ !== undefined ? forceZ : focus.z + 80
                this.currentPos.set(startX, this.yLevel, z)
                this.targetPos.copy(this.currentPos)
                this.isMoving  = false
                this.pathHistory = Array.from({ length: this.maxPathLength }, () => this.currentPos.clone())
                this.pickNextTarget()
            }

            update(extraSpeed = 0) {
                if (!this.isMoving) this.pickNextTarget()
                const speed = this.baseSpeed + extraSpeed
                const dir   = new THREE.Vector3().subVectors(this.targetPos, this.currentPos)
                const dist  = dir.length()
                if (dist < speed) {
                    this.currentPos.copy(this.targetPos)
                    this.isMoving = false
                    if (this.currentPos.z < focus.z - 400) this.respawn(focus.z + 200)
                    if (this.currentPos.z > focus.z + 200) this.respawn(focus.z - 350)
                } else {
                    dir.normalize().multiplyScalar(speed)
                    this.currentPos.add(dir)
                    this.isMoving = true
                }
                this.pathHistory.unshift(this.currentPos.clone())
                if (this.pathHistory.length > this.maxPathLength) this.pathHistory.pop()
                this.updateGeometry()
            }

            updateGeometry() {
                const pos  = this.line.geometry.attributes.position.array as Float32Array
                const col  = this.line.geometry.attributes.color.array    as Float32Array
                const pLen = this.pathHistory.length
                for (let i = 0; i < this.maxPathLength; i++) {
                    const p     = i < pLen ? this.pathHistory[i] : (this.pathHistory[pLen - 1] ?? this.currentPos)
                    pos[i*3]   = p.x; pos[i*3+1] = p.y; pos[i*3+2] = p.z
                    const alpha = i < pLen ? Math.max(0, 1 - i / this.maxPathLength) : 0
                    col[i*3]   = 0; col[i*3+1] = 0.784 * alpha; col[i*3+2] = 1.0 * alpha
                }
                this.line.geometry.attributes.position.needsUpdate = true
                this.line.geometry.attributes.color.needsUpdate    = true
            }

            pickNextTarget() {
                const dirs = [
                    new THREE.Vector3(0, 0, -this.gridSize),
                    new THREE.Vector3(0, 0, -this.gridSize),
                    new THREE.Vector3(0, 0, -this.gridSize),
                    new THREE.Vector3(0, 0, -this.gridSize),
                    new THREE.Vector3( this.gridSize, 0, 0),
                    new THREE.Vector3(-this.gridSize, 0, 0),
                ]
                const next = dirs[Math.floor(Math.random() * dirs.length)]
                this.targetPos.copy(this.currentPos).add(next)
                if (Math.abs(this.targetPos.x) > BOARD.maxX - 10) {
                    this.targetPos.x  = this.currentPos.x
                    this.targetPos.z -= this.gridSize
                }
                this.isMoving = true
            }
        }

        // ── Helpers de construção da placa ────────────────────────────────────

        const Y = BOARD.y

        function reg<T>(obj: T): T {
            scene.add(obj as THREE.Object3D)
            disposables.push(obj)
            return obj
        }

        // Segmentos de linha a partir de pares [x1, z1, x2, z2]
        function traces(coords: number[], color: number, opacity: number) {
            const verts: number[] = []
            for (let i = 0; i < coords.length; i += 4) {
                verts.push(coords[i], Y, coords[i+1], coords[i+2], Y, coords[i+3])
            }
            const geo = new THREE.BufferGeometry()
            geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
            const mat = new THREE.LineBasicMaterial({
                color, transparent: true, opacity,
                blending: THREE.AdditiveBlending, depthWrite: false,
            })
            const ls = new THREE.LineSegments(geo, mat)
            ls.frustumCulled = false
            return reg(ls)
        }

        function wireBox(x: number, z: number, w: number, h: number, d: number, color: number, opacity: number) {
            const geo  = new THREE.BoxGeometry(w, h, d)
            const edge = new THREE.EdgesGeometry(geo)
            geo.dispose()
            const mat  = new THREE.LineBasicMaterial({
                color, transparent: true, opacity,
                blending: THREE.AdditiveBlending, depthWrite: false,
            })
            const ls = new THREE.LineSegments(edge, mat)
            ls.position.set(x, Y + h / 2, z)
            return reg(ls)
        }

        function wireCylinder(x: number, z: number, r: number, h: number, color: number, opacity: number) {
            const geo  = new THREE.CylinderGeometry(r, r, h, 8)
            const edge = new THREE.EdgesGeometry(geo)
            geo.dispose()
            const mat  = new THREE.LineBasicMaterial({
                color, transparent: true, opacity,
                blending: THREE.AdditiveBlending, depthWrite: false,
            })
            const ls = new THREE.LineSegments(edge, mat)
            ls.position.set(x, Y + h / 2, z)
            return reg(ls)
        }

        function wireTorus(x: number, z: number, r: number, tube: number, color: number, opacity: number) {
            const geo  = new THREE.TorusGeometry(r, tube, 8, 18)
            const edge = new THREE.EdgesGeometry(geo)
            geo.dispose()
            const mat  = new THREE.LineBasicMaterial({
                color, transparent: true, opacity,
                blending: THREE.AdditiveBlending, depthWrite: false,
            })
            const ls = new THREE.LineSegments(edge, mat)
            ls.rotation.x = Math.PI / 2
            ls.position.set(x, Y + tube, z)
            return reg(ls)
        }

        function wireRing(x: number, z: number, r: number, opacity: number, color = 0x00C8FF) {
            const g = new THREE.CircleGeometry(r, 20)
            const e = new THREE.EdgesGeometry(g); g.dispose()
            const m = new THREE.LineBasicMaterial({
                color, transparent: true, opacity,
                blending: THREE.AdditiveBlending, depthWrite: false,
            })
            const ls = new THREE.LineSegments(e, m)
            ls.rotation.x = -Math.PI / 2
            ls.position.set(x, Y + 0.2, z)
            return reg(ls)
        }

        // ── PCB — base escura e contorno ──────────────────────────────────────

        function createPCBBase() {
            const w   = BOARD.maxX - BOARD.minX
            const d   = BOARD.maxZ - BOARD.minZ
            const geo = new THREE.PlaneGeometry(w, d)
            const mat = new THREE.MeshBasicMaterial({ color: 0x03100a, side: THREE.FrontSide })
            const pl  = new THREE.Mesh(geo, mat)
            pl.rotation.x = -Math.PI / 2
            pl.position.set((BOARD.minX + BOARD.maxX) / 2, Y - 0.5, (BOARD.minZ + BOARD.maxZ) / 2)
            reg(pl)
        }

        function createPCBOutline() {
            const mx = BOARD.minX, Mx = BOARD.maxX
            const mz = BOARD.minZ, Mz = BOARD.maxZ
            const pts = [
                new THREE.Vector3(mx, Y, Mz), new THREE.Vector3(Mx, Y, Mz),
                new THREE.Vector3(Mx, Y, mz), new THREE.Vector3(mx, Y, mz),
                new THREE.Vector3(mx, Y, Mz),
            ]
            const geo = new THREE.BufferGeometry().setFromPoints(pts)
            const mat = new THREE.LineBasicMaterial({
                color: 0xff4500, transparent: true, opacity: 0.5,
                blending: THREE.AdditiveBlending,
            })
            reg(new THREE.Line(geo, mat))

            // furos de fixação nos cantos
            const corners: [number, number][] = [[-195, 105], [195, 105], [-195, -715], [195, -715]]
            corners.forEach(([cx, cz]) => {
                const g = new THREE.CircleGeometry(5, 12)
                const e = new THREE.EdgesGeometry(g); g.dispose()
                const m = new THREE.LineBasicMaterial({
                    color: 0xff4500, transparent: true, opacity: 0.35,
                    blending: THREE.AdditiveBlending,
                })
                const c = new THREE.LineSegments(e, m)
                c.rotation.x = -Math.PI / 2
                c.position.set(cx, Y + 0.1, cz)
                reg(c)
            })
        }

        // ── Zona 0 — CPU ──────────────────────────────────────────────────────

        function createCPUArea() {
            const cx = 0, cz = 50

            // ── Socket ────────────────────────────────────────────────────────

            // Silkscreen keep-out (referência externa)
            wireBox(cx, cz, 94, 1, 94, 0xff4500, 0.16)

            // ILM — suportes de canto em L (frame de retenção do processador)
            const ih = 43, bl = 12
            traces([
                cx-ih, cz+ih, cx-ih+bl, cz+ih,   cx-ih, cz+ih, cx-ih, cz+ih-bl,
                cx+ih, cz+ih, cx+ih-bl, cz+ih,   cx+ih, cz+ih, cx+ih, cz+ih-bl,
                cx-ih, cz-ih, cx-ih+bl, cz-ih,   cx-ih, cz-ih, cx-ih, cz-ih+bl,
                cx+ih, cz-ih, cx+ih-bl, cz-ih,   cx+ih, cz-ih, cx+ih, cz-ih+bl,
            ], 0xff4500, 0.7)

            // Socket outer frame
            wireBox(cx, cz, 72, 3, 72, 0x00C8FF, 0.78)

            // Socket inner contact frame
            wireBox(cx, cz, 58, 2, 58, 0x00C8FF, 0.38)

            // Entalhes de alinhamento (indicador de orientação — lado +Z)
            traces([
                cx - 8, cz + 29, cx - 8, cz + 36,
                cx + 8, cz + 29, cx + 8, cz + 36,
                cx - 8, cz + 36, cx + 8, cz + 36,
            ], 0xff4500, 0.55)

            // Furos de fixação do heatsink (×4)
            ;[[-57, 57], [57, 57], [-57, -57], [57, -57]].forEach(([dx, dz]) => {
                wireRing(cx + dx, cz + dz, 7, 0.45, 0xff4500)
                wireRing(cx + dx, cz + dz, 3.5, 0.72, 0xff4500)
            })

            // Grade de pinos LGA — 16×16 principal + 15×15 entrelinhado
            const pinPos: number[] = []
            const step = 3.3
            const n1 = 16, o1 = -(n1 - 1) * step / 2
            for (let px = 0; px < n1; px++) {
                for (let pz = 0; pz < n1; pz++) {
                    pinPos.push(cx + o1 + px * step, Y + 2.2, cz + o1 + pz * step)
                }
            }
            const n2 = 15, o2 = o1 + step / 2
            for (let px = 0; px < n2; px++) {
                for (let pz = 0; pz < n2; pz++) {
                    pinPos.push(cx + o2 + px * step, Y + 1.8, cz + o2 + pz * step)
                }
            }
            const pinGeo = new THREE.BufferGeometry()
            pinGeo.setAttribute('position', new THREE.Float32BufferAttribute(pinPos, 3))
            reg(new THREE.Points(pinGeo, new THREE.PointsMaterial({
                color: 0x00C8FF, size: 1.1, transparent: true, opacity: 0.48,
                blending: THREE.AdditiveBlending,
            })))

            // ── Capacitores de desacoplamento (adjacentes ao socket) ──────────

            for (let i = 0; i < 6; i++) {
                wireCylinder(cx - 27 + i * 11, cz + 49, 2.2, 6, 0x00C8FF, 0.44)
                wireCylinder(cx - 27 + i * 11, cz - 49, 2.2, 6, 0x00C8FF, 0.44)
            }
            for (let i = 0; i < 5; i++) {
                wireCylinder(cx - 49, cz - 20 + i * 11, 2.2, 6, 0x00C8FF, 0.38)
                wireCylinder(cx + 49, cz - 20 + i * 11, 2.2, 6, 0x00C8FF, 0.38)
            }

            // ── VRM — indutores (toroides fase) ───────────────────────────────

            // 6 indutores em grid 3×2 (acima-esquerdo do socket)
            for (let row = 0; row < 2; row++) {
                for (let col = 0; col < 3; col++) {
                    wireTorus(cx - 80 - row * 22, cz + 52 - col * 23, 8.5, 3.2, 0x00C8FF, 0.58)
                }
            }

            // ── VRM — capacitores bulk ────────────────────────────────────────

            // Coluna principal esquerda (2 fileiras, 4 rows)
            for (let i = 0; i < 4; i++) {
                wireCylinder(cx - 86, cz + 26 - i * 17, 5, 15, 0x00C8FF, 0.54)
                wireCylinder(cx - 102, cz + 26 - i * 17, 5, 15, 0x00C8FF, 0.48)
            }
            // Fileira superior (acima do socket, entre indutores)
            for (let i = 0; i < 5; i++) {
                wireCylinder(cx - 36 + i * 18, cz + 80, 5, 15, 0x00C8FF, 0.5)
            }
            // Caps menores direita
            for (let i = 0; i < 3; i++) {
                wireCylinder(cx + 82, cz + 18 - i * 17, 4, 11, 0x00C8FF, 0.4)
            }

            // ── PWM Controller IC ─────────────────────────────────────────────

            wireBox(cx - 88, cz + 6, 24, 3, 18, 0x00C8FF, 0.55)
            const pwm: number[] = []
            for (let p = 0; p < 5; p++) {
                const pz = cz + 6 - 7 + p * 3.5
                pwm.push(cx-100, pz, cx-106, pz,  cx-76, pz, cx-70, pz)
            }
            traces(pwm, 0x00C8FF, 0.28)

            // ── Conector EPS 8-pin ────────────────────────────────────────────

            for (let row = 0; row < 2; row++) {
                for (let col = 0; col < 4; col++) {
                    wireBox(cx + 130 + row * 11, cz + 85 - col * 11, 9, 9, 9, 0xff4500, 0.48)
                }
            }

            // ── Trilhas de energia (power delivery) ───────────────────────────

            // Trace EPS → indutor (laranja duplo)
            traces([
                cx+125, cz+85, cx-73, cz+85,  cx+127, cz+85, cx-73, cz+85,
                cx-73,  cz+85, cx-73, cz+52,  cx-71,  cz+85, cx-71, cz+52,
            ], 0xff4500, 0.38)

            // Trilhas indutor → socket (VRM output, ciano)
            for (let col = 0; col < 3; col++) {
                const iz = cz + 52 - col * 23
                traces([
                    cx-71, iz, cx-36, iz,
                    cx-71, iz+1, cx-36, iz+1,
                ], 0x00C8FF, 0.22)
            }

            // Rails de alimentação verticais na borda esquerda
            traces([
                BOARD.minX+30, BOARD.maxZ, BOARD.minX+30, cz-36,
                BOARD.minX+32, BOARD.maxZ, BOARD.minX+32, cz-36,
            ], 0xff4500, 0.25)

            // ── Bus DDR → RAM ─────────────────────────────────────────────────

            const bus: number[] = []
            ;[-50, -18, 18, 50].forEach(bx => {
                for (let t = 0; t < 4; t++) {
                    const tx = cx + bx - 1.5 + t
                    bus.push(tx, cz - 36, tx, -115)
                }
            })
            traces(bus, 0x00C8FF, 0.28)
        }

        // ── Zona 1 — RAM ──────────────────────────────────────────────────────

        function createRAMArea() {
            const cz = -170
            const slotXs = [-78, -52, -16, 10]
            const slotLen = 92

            slotXs.forEach(sx => {
                // Slot DIMM
                wireBox(sx, cz, 9, 5, slotLen, 0x00C8FF, 0.6)
                // Travas retentoras
                wireBox(sx, cz - slotLen / 2 - 5, 11, 9, 10, 0x00C8FF, 0.4)
                wireBox(sx, cz + slotLen / 2 + 5, 11, 9, 10, 0x00C8FF, 0.4)
                // Módulo (placeholder fino translúcido)
                wireBox(sx, cz, 4, 18, slotLen * 0.88, 0x00C8FF, 0.12)
            })

            // Continuação do bus CPU→RAM
            const bus: number[] = []
            const groups = [-50, -18, 18, 50]
            groups.forEach(bx => {
                for (let t = 0; t < 4; t++) {
                    const tx = bx - 1.5 + t
                    bus.push(tx, -115, tx, cz - slotLen / 2)
                }
            })
            traces(bus, 0x00C8FF, 0.22)

            // Bypass caps laterais
            for (let i = 0; i < 5; i++) {
                wireCylinder(-105, cz - 24 + i * 12, 3, 8, 0x00C8FF, 0.3)
                wireCylinder(32,   cz - 24 + i * 12, 3, 8, 0x00C8FF, 0.3)
            }
        }

        // ── Zona 2 — Chipset + PCIe ───────────────────────────────────────────

        function createPCIeArea() {
            const cz = -390

            // Chipset IC
            const chipX = -20, chipZ = cz - 35
            wireBox(chipX, chipZ, 52, 4, 52, 0x00C8FF, 0.65)
            // Pinos do chipset (4 lados)
            const chipPins: number[] = []
            for (let p = 0; p < 5; p++) {
                const o = -16 + p * 8
                chipPins.push(
                    chipX + o, chipZ + 26, chipX + o, chipZ + 34,
                    chipX + o, chipZ - 26, chipX + o, chipZ - 34,
                    chipX - 26, chipZ + o, chipX - 36, chipZ + o,
                    chipX + 26, chipZ + o, chipX + 36, chipZ + o,
                )
            }
            traces(chipPins, 0x00C8FF, 0.3)

            // Trilhas chipset → RAM (DMI)
            const dmi: number[] = []
            for (let t = 0; t < 8; t++) {
                const tx = chipX - 7 + t * 2
                dmi.push(tx, chipZ + 34, tx, -260)
            }
            traces(dmi, 0x00C8FF, 0.18)

            // Slot PCIe x16
            const pcieLen = 210
            wireBox(-5, cz + 15, pcieLen, 5, 12, 0x00C8FF, 0.65)
            // Post guia
            wireBox(-5 + pcieLen / 2 - 12, cz + 15, 10, 9, 14, 0x00C8FF, 0.4)

            // Slot PCIe x4
            wireBox(-60, cz - 40, 88, 5, 12, 0x00C8FF, 0.5)

            // Pares diferenciais PCIe (acima do slot x16)
            const diffPairs: number[] = []
            for (let lane = 0; lane < 8; lane++) {
                const bx = -5 - pcieLen / 2 + 12 + lane * 23
                diffPairs.push(
                    bx,     cz + 22, bx,     chipZ - 26,
                    bx + 3, cz + 22, bx + 3, chipZ - 26,
                )
            }
            traces(diffPairs, 0x00C8FF, 0.22)

            // Slots M.2
            wireBox(110, cz + 25, 52, 4, 12, 0xff4500, 0.5)
            wireBox(110, cz - 20, 52, 4, 12, 0xff4500, 0.5)

            // Caps ao redor do slot x16
            for (let i = 0; i < 5; i++) {
                wireCylinder(-110 + i * 28, cz + 35, 3, 8, 0x00C8FF, 0.28)
            }
        }

        // ── Zona 3 — Painel I/O ───────────────────────────────────────────────

        function createIOArea() {
            const cz = -610

            // Portas I/O (borda esquerda)
            const ports = [14, 14, 10, 18, 22, 10, 10, 10]
            let pz = cz + 72
            ports.forEach(len => {
                wireBox(BOARD.minX + 13, pz, 15, 12, len, 0xff4500, 0.55)
                pz -= len + 7
            })

            // Conector ATX 24-pin (direita)
            for (let row = 0; row < 2; row++) {
                for (let col = 0; col < 12; col++) {
                    wireBox(BOARD.maxX - 28 + row * 11, cz + 62 - col * 11, 9, 9, 9, 0xff4500, 0.45)
                }
            }

            // Header front panel
            wireBox(80, cz - 45, 32, 6, 22, 0xff4500, 0.38)

            // Bateria CMOS
            wireCylinder(-100, cz + 35, 14, 5, 0x00C8FF, 0.38)

            // Fan headers
            const fans: [number, number][] = [[120, cz + 85], [-145, cz - 25], [55, cz - 65]]
            fans.forEach(([fx, fz]) => wireBox(fx, fz, 14, 6, 7, 0xff4500, 0.33))

            // Trilhas de energia ATX espalhando pela placa
            traces([
                BOARD.maxX - 28, cz + 62,  BOARD.minX + 25, cz + 62,
                BOARD.maxX - 26, cz + 62,  BOARD.minX + 25, cz + 62,
                BOARD.minX + 25, BOARD.maxZ, BOARD.minX + 25, BOARD.minZ,
                BOARD.minX + 27, BOARD.maxZ, BOARD.minX + 27, BOARD.minZ,
            ], 0xff4500, 0.28)

            // Trilhas USB (pares diferenciais)
            const usb: number[] = []
            for (let p = 0; p < 4; p++) {
                const bx = BOARD.minX + 40 + p * 18
                usb.push(
                    bx,     cz + 30, bx,     cz - 30,
                    bx + 3, cz + 30, bx + 3, cz - 30,
                )
            }
            traces(usb, 0x00C8FF, 0.2)
        }

        // ── Rota (bus principal da placa) ─────────────────────────────────────

        function createRouteLine() {
            const curve  = new THREE.CatmullRomCurve3(ROUTE.map(p => new THREE.Vector3(p.x, Y + 1, p.z)))
            const points = curve.getPoints(120)
            const geo    = new THREE.BufferGeometry().setFromPoints(points)
            const mat    = new THREE.LineBasicMaterial({
                color: 0x00C8FF, transparent: true, opacity: 0.35,
                blending: THREE.AdditiveBlending,
            })
            routeLine = new THREE.Line(geo, mat)
            scene.add(routeLine)
        }

        // ── Zone markers — pads de solda circulares ───────────────────────────

        function createZoneMarkers() {
            ROUTE.forEach(wp => {
                const makeRing = (r: number, op: number) => {
                    const g  = new THREE.CircleGeometry(r, 20)
                    const eg = new THREE.EdgesGeometry(g); g.dispose()
                    const m  = new THREE.LineBasicMaterial({
                        color: 0x00C8FF, transparent: true, opacity: op,
                        blending: THREE.AdditiveBlending,
                    })
                    const ls = new THREE.LineSegments(eg, m)
                    ls.rotation.x = -Math.PI / 2
                    ls.position.set(wp.x, Y + 0.2, wp.z)
                    scene.add(ls)
                    disposables.push(ls)
                    return ls
                }
                zoneMarkers.push(makeRing(16, 0.6))
                makeRing(6, 0.9)  // via hole interno
            })
        }

        // ── Câmera ────────────────────────────────────────────────────────────

        function updateCamera(intensity: number) {
            const phase = tunnelRef.current.phase
            const fromPt = ROUTE[currentZone]
            const toPt   = ROUTE[targetZone]

            if (phase !== 'idle' && intensity > 0) {
                const s      = Math.min(1, intensity)
                const smooth = s * s * (3 - 2 * s)
                focus.lerpVectors(fromPt, toPt, smooth)
            } else {
                focus.lerp(fromPt, 0.04)
            }

            const desiredX = focus.x + mouseX * 10
            const desiredY = focus.y + CAM_HEIGHT
            const desiredZ = focus.z + CAM_BACK

            const lerpSpeed = phase !== 'idle' ? 0.07 : 0.04
            camera.position.x += (desiredX - camera.position.x) * lerpSpeed
            camera.position.y += (desiredY - camera.position.y) * lerpSpeed
            camera.position.z += (desiredZ - camera.position.z) * lerpSpeed

            camera.lookAt(focus.x, -10, focus.z)
            camera.fov = 60 - intensity * 5
            camera.updateProjectionMatrix()

            if (scene.fog instanceof THREE.FogExp2) {
                scene.fog.density = 0.0025 - intensity * 0.0012
            }
        }

        // ── Loop de animação ──────────────────────────────────────────────────

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate)
            const { phase, intensity, direction } = tunnelRef.current
            const time = performance.now() * 0.001

            if (prevPhase === 'idle' && phase === 'ramp') {
                targetZone = Math.max(0, Math.min(SECTION_COUNT - 1, currentZone + direction))
            }
            if (phase === 'idle' && prevPhase !== 'idle') {
                currentZone = targetZone
            }
            prevPhase = phase

            const boost = phase !== 'idle' ? intensity * 40 : 0
            gridRunners.forEach(r => r.update(boost))

            updateCamera(intensity)

            // Route line pulsa levemente
            if (routeLine) {
                ;(routeLine.material as THREE.LineBasicMaterial).opacity = 0.28 + Math.sin(time * 1.8) * 0.1
            }

            // Pads da zona ativa pulsam
            zoneMarkers.forEach((marker, i) => {
                const isActive = i === (phase !== 'idle' ? targetZone : currentZone)
                ;(marker.material as THREE.LineBasicMaterial).opacity = isActive
                    ? 0.6 + Math.sin(time * 4) * 0.28
                    : 0.22
            })

            renderer.render(scene, camera)
        }

        // ── Init ──────────────────────────────────────────────────────────────

        const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false

        const init = () => {
            scene = new THREE.Scene()
            scene.fog = new THREE.FogExp2(0x000510, 0.0025)

            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1200)
            camera.position.set(0, CAM_HEIGHT, ROUTE[0].z + CAM_BACK)
            camera.lookAt(0, -10, ROUTE[0].z)

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
            renderer.setSize(window.innerWidth, window.innerHeight)
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
            if (mountRef.current) mountRef.current.appendChild(renderer.domElement)

            createPCBBase()
            createPCBOutline()
            createCPUArea()
            createRAMArea()
            createPCIeArea()
            createIOArea()
            createRouteLine()
            createZoneMarkers()

            const runnerCount = prefersReducedMotion ? 6 : 22
            for (let i = 0; i < runnerCount; i++) {
                gridRunners.push(new GridRunner(-30, 50, ROUTE[0].z - Math.random() * 700))
            }

            window.addEventListener('resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight
                camera.updateProjectionMatrix()
                renderer.setSize(window.innerWidth, window.innerHeight)
            })
            document.addEventListener('mousemove', (e: MouseEvent) => {
                mouseX = (e.clientX / window.innerWidth)  * 2 - 1
                mouseY = -(e.clientY / window.innerHeight) * 2 + 1
            })

            animate()
        }

        init()

        return () => {
            cancelAnimationFrame(animationFrameId)

            gridRunners.forEach(r => {
                scene.remove(r.line)
                r.line.geometry.dispose()
                ;(r.line.material as THREE.Material).dispose()
            })

            disposables.forEach(obj => {
                scene.remove(obj)
                if (obj.geometry) obj.geometry.dispose()
                if (obj.material) {
                    Array.isArray(obj.material)
                        ? obj.material.forEach((m: THREE.Material) => m.dispose())
                        : obj.material.dispose()
                }
            })

            if (routeLine) {
                scene.remove(routeLine)
                routeLine.geometry.dispose()
                ;(routeLine.material as THREE.Material).dispose()
            }

            scene.clear()
            if (renderer) {
                renderer.dispose()
                if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
                    mountRef.current.removeChild(renderer.domElement)
                }
            }
        }
    }, [])

    return (
        <div
            ref={mountRef}
            id="canvas-container"
            aria-hidden="true"
            style={{
                position: 'fixed',
                top: 0, left: 0,
                width: '100%', height: '100vh',
                zIndex: 1,
                pointerEvents: 'none',
            }}
        />
    )
}
