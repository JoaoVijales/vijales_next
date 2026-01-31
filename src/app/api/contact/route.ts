import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, subject, message } = body

        // Validation
        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
        }

        // Here you would typically integrate with an email service like SendGrid, Postmark, or Resend.
        // For now, we'll just log it and return success.
        console.log('Received Signal:', { name, email, subject, message })

        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000))

        return NextResponse.json({ message: 'Signal transmitted successfully' })
    } catch (error) {
        console.error('Transmission error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
