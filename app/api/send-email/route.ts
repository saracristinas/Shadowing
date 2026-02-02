import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getWelcomeEmailTemplate } from '@/lib/email-templates';

export async function POST(request: Request) {
  try {
    const { name, email, locale } = await request.json();

    console.log('🚀 Iniciando envio de email...');
    console.log('📤 Remetente (de):', process.env.EMAIL_USER);
    console.log('📥 Destinatário (para):', email);
    console.log('👤 Nome do usuário:', name);
    console.log('🌍 Idioma:', locale);

    // Configurar transporter do nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const template = getWelcomeEmailTemplate(name, locale);

    const mailOptions = {
      from: `"Shadowing Platform" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: template.subject,
      html: template.html,
    };

    // Se não houver credenciais configuradas, apenas simular o envio
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('⚠️ MODO SIMULADO - Credenciais não configuradas');
      console.log('📧 Email que seria enviado:');
      console.log('   De:', mailOptions.from);
      console.log('   Para:', mailOptions.to);
      console.log('   Assunto:', mailOptions.subject);
      return NextResponse.json({ success: true, simulated: true });
    }

    console.log('📨 Enviando email real...');
    await transporter.sendMail(mailOptions);
    console.log('✅ EMAIL ENVIADO COM SUCESSO!');
    console.log('🎯 Verifique a caixa de entrada de:', email);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('❌ ERRO ao enviar email:');
    console.error(error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
