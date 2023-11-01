import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  try {
    const question1 = await prisma.question.create({
      data: {
        text: `<p>&nbsp; &nbsp; Há quinze anos, a média de cana cortada era de seis toneladas por trabalhador por dia. Hoje, os trabalhadores cortam dez toneladas. Intensificou-se o ritmo da jornada de trabalho para que o trabalhador seja competitivo. A referência dele passou a ser a máquina. As usinas, para terem um trabalhador com esse perfil, não podem tratá- -lhes como os migrantes de antigamente. Ele precisa de uma comida especial. Então, melhorou o padrão de alimentação. Precisa de descanso especial, por isso os alojamentos foram melhorados.</p><p style="text-align: right;"><small>O paradoxo no mundo do trabalho. Disponível em: http://amaivos.uol.com.br. Acesso em: 19 maio 2013 (adaptado).</small></p><p style="text-align: right;">&nbsp;</p><p>Na perspectiva apresentada no texto, as melhorias das condições de vida do trabalhador são explicadas pelo(a)</p>`,
        university: 'UFRGS',
        subject: 'Geografia',
        topics: {
          create: [
            {
              name: 'Cana de açúcar',
            },
            {
              name: 'Trabalho',
            },
          ],
        },
        alternatives: {
          create: [
            {
              text: 'aumento da produtividade do trabalho.',
              correct: true,
            },
            {
              text: 'redução da jornada de trabalho.',
              correct: false,
            },
            {
              text: 'diminuição da mecanização do trabalho.',
              correct: false,
            },
            {
              text: 'aumento do número de trabalhadores.',
              correct: false,
            },
            {
              text: 'redução do ritmo de trabalho.',
              correct: false,
            },
          ],
        },
      },
    });

    const bob = await prisma.user.upsert({
      where: { email: 'bob@prisma.io' },
      update: {},
      create: {
        email: 'bob@prisma.io',
        name: 'Bob',
      },
    });

    console.log('Question and User created:', question1, bob);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
