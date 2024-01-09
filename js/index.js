"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.querySelector("#search_form > form");
const input = document.querySelector("#input_localizacao");
const sectionTempoInfo = document.querySelector("#tempo_info");
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    if (!input || !sectionTempoInfo)
        return;
    const localizacao = input.value;
    if (localizacao.length < 3) {
        alert("O local precisa ter, pelo menos, três letras.");
        return;
    }
    try {
        const response = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=1aa647601a8783fd5debb5588ea15722&lang=pt_br&units=metric`);
        const data = yield response.json();
        const infos = {
            temperature: Math.round(data.main.temp),
            local: data.name,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        };
        sectionTempoInfo.innerHTML = `
            <div class="tempo_data">
              <h2>${infos.local}</h2>
    
              <span>${infos.temperature}°C</span>
            </div>
    
              <img src="${infos.icon}" />
    
          `;
    }
    catch (err) {
        console.log("Ocorreu um erro na obtenção dos dados da API.", err);
    }
}));
