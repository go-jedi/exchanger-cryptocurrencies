import generator from "generate-password";

const password = generator.generate({
    length: 25,
    numbers: true,
});

export default password;
