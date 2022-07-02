export const getRandomQuote = (username) => {
    const quotesArray = [
        ` “ You look awesome today, ${username} 😉 ” `,
        ` “ You look incredible today, ${username} 😉 ” `,
        ` “ Stay safe, ${username} 😍 ” `,
        ` “ We hope that you fine today, ${username} 😍 ” `,
        ` “ Be fine, ${username} 🌹 ” `,
        ` “ Be Strong, ${username} 🌹 ” `,
        ` “ Be Amazing, ${username} 🌹 ” `,
        " “ Love the life you live, live the life you love 🌹 ”  ",
        ` “ Enjoy in every moment in your life, ${username} 😉 ” `,
        ` “ Seize the days, ${username} 😉 ”  `
    ];
    const randWord = Math.floor(Math.random() * quotesArray.length);
    return quotesArray[randWord];
}
