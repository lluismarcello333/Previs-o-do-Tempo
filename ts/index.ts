const form = document.querySelector("#search_form > form");
const input: HTMLInputElement | null =
  document.querySelector("#input_localizacao");

const sectionTempoInfo = document.querySelector("#tempo_info");

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!input || !sectionTempoInfo) return;

  const localizacao = input.value;

  if (localizacao.length < 3) {
    alert("O local precisa ter, pelo menos, três letras.");
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${localizacao}&appid=1aa647601a8783fd5debb5588ea15722&lang=pt_br&units=metric`
    );
    const data = await response.json();

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
  } catch (err) {
    console.log("Ocorreu um erro na obtenção dos dados da API.", err);
  }
});
