#! /usr/bin/env node
import inquirer from "inquirer";

class Hero {
    name: string;
    health = 100;

    constructor(name: string) {
        this.name = name;
    }

    decreaseHealth() {
        this.health -= 25;
    }

    increaseHealth() {
        this.health = 100;
    }
}

class Enemy {
    name: string;
    health = 100;

    constructor(name: string) {
        this.name = name;
    }
    decreaseHealth() {
        this.health -= 25;
    }

    increaseHealth() {
        this.health = 100;
    }
}

async function main() {
    const { heroName } = await inquirer.prompt([
        {
            type: "input",
            name: "heroName",
            message: "Please enter your hero's name: "
        }
    ]);

    const { enemyType } = await inquirer.prompt([
        {
            type: "list",
            name: "enemyType",
            choices: ["Demon", "Witch", "Zombie"],
            message: "Select your enemy",
        }
    ]);

    const hero = new Hero(heroName);
    const enemy = new Enemy(enemyType);

    console.log(`${enemy.name} v/s ${hero.name}`);

    do {
        const { action } = await inquirer.prompt(
            [
                {
                    type: "list",
                    name: "action",
                    choices: ["Attack", "Defend", "Run"],
                    message: "Choose your action",
                }
            ]
        );
        switch (action) {
            case "Attack":
                const randomNum = Math.random();
                if (randomNum > 0.5) {
                    hero.decreaseHealth();
                    console.log(`${hero.name} health: ${hero.health}`);
                    console.log(`${enemy.name} health: ${enemy.health}`);
                    if (hero.health <= 0) {
                        console.log("You lost the game! Try again!");
                        return;
                    }
                } else {
                    enemy.decreaseHealth();
                    console.log(`${hero.name} health: ${hero.health}`);
                    console.log(`${enemy.name} health: ${enemy.health}`);
                    if (enemy.health <= 0) {
                        console.log("Congratulations! You won!");
                        return;
                    }
                }
                break;
        }
    } while (true);
}

main();