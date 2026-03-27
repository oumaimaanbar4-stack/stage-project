export const getCommands = async () => {
    const response = await fetch('/data/command.json');
    return await response.json();
};