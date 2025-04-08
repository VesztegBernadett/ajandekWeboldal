import { kerdesek } from "./kerdesek.mjs";
import { hibasValaszok } from "./kerdesek.mjs";
import { uzenet } from "./kerdesek.mjs";

let form = document.getElementById("form");
let index = 0;

let helyesValaszok = 0;

updateQuestion();

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const selected = document.querySelector('input[name="valasz"]:checked');

    let megjegyzes = document.getElementById("megjegyzes")
    if (selected) {
        if (selected.value == kerdesek[index].HelyesV) {
            helyesValaszok++;
            megjegyzes.textContent = "Helyes válasz!";
            megjegyzes.style.backgroundColor = "#d4edda";
            megjegyzes.style.borderColor = "#28a745";
        } else {
            megjegyzes.textContent = `${hibasValaszok[index]}`;
            megjegyzes.style.backgroundColor = "#f8d7da";
            megjegyzes.style.borderColor = "#dc3545";
        }
        setTimeout(() => {
            megjegyzes.textContent = "";
            megjegyzes.style.backgroundColor = "";
            megjegyzes.style.borderColor = "";
            index++;
            updateQuestion();
        }, 1500);
    } else {
        megjegyzes.textContent = "Nem választott semmit!";
    }

});

function updateQuestion() {
    if (index <= 10) {
        if (index == 4) {
            let image = document.createElement("img")
            image.src = "src/doga_vz.png"
            form.prepend(image)
        }
        else if (index == 5) {
            const existingImage = form.querySelector("img");
            existingImage.remove();
        }


        let options = [kerdesek[index].HelyesV, kerdesek[index].helytelenV, kerdesek[index].helytelenV2]
        let label = document.querySelector("label")
        label.textContent = kerdesek[index].Kerdes


        for (let index = 0; index < 3; index++) {
            const randomIndex = Math.floor(Math.random() * options.length);
            const randomErtek = options[randomIndex];

            let label = document.getElementById(`valasz${index + 1}l`)
            label.textContent = randomErtek

            let input = document.getElementById(`valasz${index + 1}`)
            input.value = randomErtek
            options.splice(randomIndex, 1);
        }
    }
    else {
        let main = document.querySelector("main");

        while (main.firstChild) {
            main.removeChild(main.firstChild);
        }
        let h1 = document.querySelector("h1");
        h1.textContent = "Helyes válaszok száma:";

        let p = document.createElement("p");
        p.className = "szam"
        p.textContent = `11/${helyesValaszok}`;
        main.appendChild(p);

        let p2 = document.createElement("p");
        if (helyesValaszok < 4) {
            p2.textContent = uzenet[0];
        }
        else if (helyesValaszok < 8) {
            p2.textContent = uzenet[1];
        }
        else {
            p2.textContent = uzenet[2]+ " 😇";
        }

        p2.className = "szam"
        main.appendChild(p2);
    }
}





