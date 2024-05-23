<template>
  <div v-if="Prikazi">
  <head v-if="Podatak === null || !showElementLoad">
    <link rel="stylesheet" href="/css/NoviGumbici.css">
    <link rel="stylesheet" href="/css/PSE.css">
  </head>
  <div style="display: flex; background-color: #454545; height: 6vh; position: relative; z-index: 100; width: 100%; margin-bottom: 1vw;">
      <div style="margin-top: -0.2vw; display: flex; width: 30%; align-items: center;"><a class="Alink" @click="changeZaglavlje()"><button class="Blink">MineralogijaHR</button></a></div>
      <div style="margin-top: -0.2vw; display: flex; width: 100%; align-items: center; color: white; justify-content: center;"><div class="Mjestooo" style="font-family: 'Rubik';">&#8275; Mjesto gdje su svi minerali prirodni &#8275;</div></div>
      <div style="margin-top: -0.2vw; display: flex; width: 30%; align-items: center; justify-content: right; margin-right: 1.5vw;">
        
        
  
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: transparent; border: none; font-family: rubik;">
            Menu
          </button>
          <ul class="dropdown-menu" style="height: fit-content;">
            <li class="Lili"><a class="dropdown-item" style="font-family: rubik;" @click="Min()">Minerali</a></li>
            <li class="Lili"><a class="dropdown-item" style="font-family: rubik;" @click="Gal()">Galerija</a></li>
            <li class="Lili"><a class="dropdown-item" style="font-family: rubik;">PSE</a></li>
          </ul>
        </div>
      </div>
    </div>

  <!-- v-if="Podatak && !ElementDataExists -->
      <div v-if="showElementLoad" >
        <Element :dataProp="Podatak" @elementNotFound="handleElementNotFound"></Element>
      </div>
      
  <!-- v-if="Podatak === null" -->
  <div v-else class="Sve" style="margin-bottom: 100vh;">
    
      <div class="Cijeli-PSE">
        
        <div class="NultaPerioda">
          <div class="vrh">1</div>
          <div class="prazan"></div>
          <div class="prazan"></div>
          <div class="prazan"></div>
          <div class="prazan"></div> 
          <div class="prazan"></div>
          <div class="prazan"></div>
          <div class="prazan"></div>
          <div class="prazan"></div>
          <div class="prazan"></div>
          <div class="prazan"></div>
          <div class="prazan"></div>
          <div class="prazan"></div>
          <div class="prazan"></div>
          <div class="prazan"></div>
          <div class="prazan"></div>
          <div class="prazan"></div>
          <div class="vrh">18</div>
        </div>

        <div class="PrvaPerioda">         <!-- 1. PERIODA -->

          
          <div class="rub">1</div>

          <a class="Link" @click="handleClick('Vodik')">
            <div class="Box-Nemetal">
              <button class="Gumb-Nemetal">
                <div class="AtomskiBroj">1</div>
                <div class="Simbol-Plin">H</div>
                <div class="Ime">Vodik</div>
                <div class="Relativna">1,008</div>
              </button>
            </div>
          </a>

          <div class="PoravnanjeL">
            <div class="vrhD">2</div>
          </div>
          <div class="Prazan"></div>
          <div class="Prazan"></div>
          <div class="Prazan"></div>
          <div class="Prazan"></div> 
          <div class="Prazan"></div>
          <div class="Prazan"></div>
          <div class="Prazan"></div>
          <div class="Prazan"></div>
          <div class="Prazan"></div>
          <div class="Prazan"></div>
          <div class="PoravnanjeD">
            <div class="vrhD">13</div>
            <div class="vrhD">14</div>
            <div class="vrhD">15</div>
            <div class="vrhD">16</div>
            <div class="vrhD">17</div>
          </div>

          <a class="Link" @click="handleClick('Helij')">
            <div class="Box-Nemetal">
              <button class="Gumb-Nemetal">
                <div class="AtomskiBroj">2</div>
                <div class="Simbol-Plin">He</div>
                <div class="Ime">Helij</div>
                <div class="Relativna">4,003</div>
              </button>
            </div>
          </a>

        </div>

        <div class="DrugaPerioda">         <!-- 2. PERIODA -->

          <div class="rub">2</div>

          <a class="Link" @click="handleClick('Litij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">3</div>
                <div class="Simbol">Li</div>
                <div class="Ime">Litij</div>
                <div class="Relativna">6,941</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Berilij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">4</div>
                <div class="Simbol">Be</div>
                <div class="Ime">Berilij</div>
                <div class="Relativna">9,012</div>
              </button>
            </div>
          </a>
          
          <div class="Prazan"></div>
          <!--<div class="Prazan"></div>
          <div class="Prazan"></div>-->
          <div class="Prazan2" style="border: solid transparent">

            <div class="Oznake">
              <div class="AtomskiBrojPrimjer">35</div>
              <div class="SimbolPrimjer">Br</div>
              <div class="ImePrimjer">Brom</div>
              <div class="RelativnaPrimjer">79,90</div>
            </div>

            <div class="SvaObjasnjenja">

              <div class="AtomskiObjasnjenje">
                  <div class="Triangl-L"></div>
                  <div class="Stapic"></div>
                  <div class="Opis">Protonski broj</div>
              </div>

              <div class="SimbolObjasnjenje">
                <div class="Triangl-L"></div>
                  <div class="Stapic"></div>
                  <div class="OpisStanja">
                    <div class="SimbolStanje">Simbol elementa + stanje</div>

                    <div class="Edit">
                      <div class="Zagrada">{</div>
                    </div>
                    <div class="Stanje">
                      <div class="Kruto"><span class="dotK"></span>&nbsp;Kruto</div>
                      <div class="Tekuće"><span class="dotT"></span>&nbsp;Tekuće</div>
                      <div class="Plinovito"><span class="dotP"></span>&nbsp;Plinovito</div>
                    </div>
                  </div>
              </div>

              <div class="ImeObjasnjenje">
                <div class="Triangl-L"></div>
                  <div class="Stapic"></div>
                  <div class="Opis">Naziv elementa</div>
              </div>

              <div class="RelativnaObjasnjenje">
                <div class="Triangl-L"></div>
                  <div class="Stapic"></div>
                  <div class="Opis">Relativna atomska masa</div>
              </div>

              <div class="ObjElemenata">

                <div class="Metali">
                  <div class="Boja" style="background-color: #6495ed;"></div>
                  <div class="Tip">&nbsp;Metal</div>
                </div>

                <div class="Polumetali">
                  <div class="Boja" style="background-color: #1abc9c;"></div>
                  <div class="Tip">&nbsp;Polumetal</div>
                </div>
                
                <div class="Nemetali">
                  <div class="Boja" style="background-color: #ccccff;"></div> <!-- rad &#x2622;  umj &#x274B; &#x2743;-->
                  <div class="Tip">&nbsp;Nemetal</div>
                </div>

                

              </div>

              <div class="ObjZnakova">

                <div class="Umjetni">
                  <div class="SimbolUmjetni">&#x2605;</div>
                  <div class="Tip" style="border: none; padding-top: 0.2vw;">&nbsp;Umjetno dobiveni elementi</div>
                </div>

                <div class="Radioaktivni">
                  <div class="SimbolRadioaktivni">&#x2622;</div>
                  <div class="Tip"  style="border: none; padding-top: 0.1vw;">&nbsp;Radioaktivni elementi</div>
                </div>

              </div>

            </div>

          </div>
          <!--<div class="Prazan"></div>
          <div class="Prazan"></div>
          <div class="Prazan"></div>
          <div class="Prazan"></div>
          <div class="Prazan"></div>-->
          <div class="Prazan"></div>
          
          <a class="Link" @click="handleClick('Bor')">
            <div class="Box-Polumetal">
              <button class="Gumb-Polumetal">
                <div class="AtomskiBroj">5</div>
                <div class="Simbol">B</div>
                <div class="Ime">Bor</div>
                <div class="Relativna">10,81</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Ugljik')">
            <div class="Box-Nemetal">
              <button class="Gumb-Nemetal">
                <div class="AtomskiBroj">6</div>
                <div class="Simbol">C</div>
                <div class="Ime">Ugljik</div>
                <div class="Relativna">12,01</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Dušik')">
            <div class="Box-Nemetal">
              <button class="Gumb-Nemetal">
                <div class="AtomskiBroj">7</div>
                <div class="Simbol-Plin">N</div>
                <div class="Ime">Dušik</div>
                <div class="Relativna">14,01</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Kisik')">
            <div class="Box-Nemetal">
              <button class="Gumb-Nemetal">
                <div class="AtomskiBroj">8</div>
                <div class="Simbol-Plin">O</div>
                <div class="Ime">Kisik</div>
                <div class="Relativna">16,00</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Fluor')">
            <div class="Box-Nemetal">
              <button class="Gumb-Nemetal">
                <div class="AtomskiBroj">9</div>
                <div class="Simbol-Plin">F</div>
                <div class="Ime">Fluor</div>
                <div class="Relativna">19,00</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Neon')">
            <div class="Box-Nemetal">
              <button class="Gumb-Nemetal">
                <div class="AtomskiBroj">10</div>
                <div class="Simbol-Plin">Ne</div>
                <div class="Ime">Neon</div>
                <div class="Relativna">20,18</div>
              </button>
            </div> 
          </a>
          
        </div>

        <div class="TrecaPerioda">         <!-- 3. PERIODA -->

          <div class="rub">3</div>

          <a class="Link" @click="handleClick('Natrij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">11</div>
                <div class="Simbol">Na</div>
                <div class="Ime">Natrij</div>
                <div class="Relativna">22,99</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Magnezij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">12</div>
                <div class="Simbol">Mg</div>
                <div class="Ime">Magnezij</div>
                <div class="Relativna">24,31</div>
              </button>
            </div>
          </a>
          
          <div class="PoravnanjeS">
            <div class="vrhD">3</div>
            <div class="vrhD">4</div>
            <div class="vrhD">5</div>
            <div class="vrhD">6</div>
            <div class="vrhD">7</div>
            <div class="vrhD">8</div>
            <div class="vrhD">9</div>
            <div class="vrhD">10</div>
            <div class="vrhD">11</div>
            <div class="vrhD">12</div>
          </div>

          <a class="Link" @click="handleClick('Aluminij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">13</div>
                <div class="Simbol">Al</div>
                <div class="Ime">Aluminij</div>
                <div class="Relativna">26,98</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Silicij')">
            <div class="Box-Polumetal">
              <button class="Gumb-Polumetal">
                <div class="AtomskiBroj">14</div>
                <div class="Simbol">Si</div>
                <div class="Ime">Silicij</div>
                <div class="Relativna">28,09</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Fosfor')">
            <div class="Box-Nemetal">
              <button class="Gumb-Nemetal">
                <div class="AtomskiBroj">15</div>
                <div class="Simbol">P</div>
                <div class="Ime">Fosfor</div>
                <div class="Relativna">30,97</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Sumpor')">
            <div class="Box-Nemetal">
              <button class="Gumb-Nemetal">
                <div class="AtomskiBroj">16</div>
                <div class="Simbol">S</div>
                <div class="Ime">Sumpor</div>
                <div class="Relativna">32,07</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Klor')">
            <div class="Box-Nemetal">
              <button class="Gumb-Nemetal">
                <div class="AtomskiBroj">17</div>
                <div class="Simbol-Plin">Cl</div>
                <div class="Ime">Klor</div>
                <div class="Relativna">35,45</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Argon')">
            <div class="Box-Nemetal">
              <button class="Gumb-Nemetal">
                <div class="AtomskiBroj">18</div>
                <div class="Simbol-Plin">Ar</div>
                <div class="Ime">Argon</div>
                <div class="Relativna">39,95</div>
              </button>
            </div>
          </a>
          
          
        </div>

        <div class="CetvrtaPerioda">         <!-- 4. PERIODA -->
        
          <div class="rub">4</div>

          <a class="Link" @click="handleClick('Kalij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">19</div>
                <div class="Simbol">K</div>
                <div class="Ime">Kalij</div>
                <div class="Relativna">39,10</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Kalcij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">20</div>
                <div class="Simbol">Ca</div>
                <div class="Ime">Kalcij</div>
                <div class="Relativna">40,08</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Skandij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">21</div>
                <div class="Simbol">Sc</div>
                <div class="Ime">Skandij</div>
                <div class="Relativna">44,96</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Titanij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">22</div>
                <div class="Simbol">Ti</div>
                <div class="Ime">Titanij</div>
                <div class="Relativna">47,87</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Vanadij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">23</div>
                <div class="Simbol">V</div>
                <div class="Ime">Vanadij</div>
                <div class="Relativna">50,94</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Krom')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">24</div>
                <div class="Simbol">Cr</div>
                <div class="Ime">Krom</div>
                <div class="Relativna">52,00</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Mangan')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">25</div>
                <div class="Simbol">Mn</div>
                <div class="Ime">Mangan</div>
                <div class="Relativna">54,94</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Željezo')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">26</div>
                <div class="Simbol">Fe</div>
                <div class="Ime">Željezo</div>
                <div class="Relativna">55,85</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Kobalt')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">27</div>
                <div class="Simbol">Co</div>
                <div class="Ime">Kobalt</div>
                <div class="Relativna">58,93</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Nikal')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">28</div>
                <div class="Simbol">Ni</div>
                <div class="Ime">Nikal</div>
                <div class="Relativna">58,69</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Bakar')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">29</div>
                <div class="Simbol">Cu</div>
                <div class="Ime">Bakar</div>
                <div class="Relativna">63,55</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Cink')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">30</div>
                <div class="Simbol">Zn</div>
                <div class="Ime">Cink</div>
                <div class="Relativna">65,38</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Galij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">31</div>
                <div class="Simbol">Ga</div>
                <div class="Ime">Galij</div>
                <div class="Relativna">69,72</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Germanij')">
            <div class="Box-Polumetal">
              <button class="Gumb-Polumetal">
                <div class="AtomskiBroj">32</div>
                <div class="Simbol">Ge</div>
                <div class="Ime">Germanij</div>
                <div class="Relativna">72,63</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Arsen')">
            <div class="Box-Polumetal">
              <button class="Gumb-Polumetal">
                <div class="AtomskiBroj">33</div>
                <div class="Simbol">As</div>
                <div class="Ime">Arsen</div>
                <div class="Relativna">74,92</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Selenij')">
            <div class="Box-Nemetal">
              <button class="Gumb-Nemetal">
                <div class="AtomskiBroj">34</div>
                <div class="Simbol">Se</div>
                <div class="Ime">Selenij</div>
                <div class="Relativna">78,96</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Brom')">
            <div class="Box-Nemetal">
              <button class="Gumb-Nemetal">
                <div class="AtomskiBroj">35</div>
                <div class="Simbol-Tekucina">Br</div>
                <div class="Ime">Brom</div>
                <div class="Relativna">79,90</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Kripton')">
            <div class="Box-Nemetal">
              <button class="Gumb-Nemetal">
                <div class="AtomskiBroj">36</div>
                <div class="Simbol-Plin">Kr</div>
                <div class="Ime">Kripton</div>
                <div class="Relativna">83,80</div>
              </button>
            </div>
          </a>

        </div>

        <div class="PetaPerioda">         <!-- 5. PERIODA -->
        
          <div class="rub">5</div>

          <a class="Link" @click="handleClick('Rubidij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">37</div>
                <div class="Simbol">Rb</div>
                <div class="Ime">Rubidij</div>
                <div class="Relativna">85,47</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Stroncij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">38</div>
                <div class="Simbol">Sr</div>
                <div class="Ime">Stroncij</div>
                <div class="Relativna">87,62</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Itrij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">39</div>
                <div class="Simbol">Y</div>
                <div class="Ime">Itrij</div>
                <div class="Relativna">88,91</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Cirkonij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">40</div>
                <div class="Simbol">Zr</div>
                <div class="Ime">Cirkonij</div>
                <div class="Relativna">91,22</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Niobij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">41</div>
                <div class="Simbol">Nb</div>
                <div class="Ime">Niobij</div>
                <div class="Relativna">92,91</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Molidben')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">42</div>
                <div class="Simbol">Mo</div>
                <div class="Ime">Molidben</div>
                <div class="Relativna">95,96</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Tehnecij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">43</div>
                  <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">43</div>-->
                <div class="Simbol">Tc</div>
                <div class="Ime">Tehnecij</div>
                <div class="Relativna">[98]</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Rutenij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">44</div>
                <div class="Simbol">Ru</div>
                <div class="Ime">Rutenij</div>
                <div class="Relativna">101,07</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Rodij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">45</div>
                <div class="Simbol">Rh</div>
                <div class="Ime">Rodij</div>
                <div class="Relativna">102,91</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Paladij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">46</div>
                <div class="Simbol">Pd</div>
                <div class="Ime">Paladij</div>
                <div class="Relativna">106,42</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Srebro')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">47</div>
                <div class="Simbol">Ag</div>
                <div class="Ime">Srebro</div>
                <div class="Relativna">107,87</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Kadmij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">48</div>
                <div class="Simbol">Cd</div>
                <div class="Ime">Kadmij</div>
                <div class="Relativna">112,41</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Indij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">49</div>
                <div class="Simbol">In</div>
                <div class="Ime">Indij</div>
                <div class="Relativna">114,82</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Kositar')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">50</div>
                <div class="Simbol">Sn</div>
                <div class="Ime">Kositar</div>
                <div class="Relativna">118,71</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Antimon')">
            <div class="Box-Polumetal">
              <button class="Gumb-Polumetal">
                <div class="AtomskiBroj">51</div>
                <div class="Simbol">Sb</div>
                <div class="Ime">Antimon</div>
                <div class="Relativna">121,76</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Telurij')">
            <div class="Box-Polumetal">
              <button class="Gumb-Polumetal">
                <div class="AtomskiBroj">52</div>
                <div class="Simbol">Te</div>
                <div class="Ime">Telurij</div>
                <div class="Relativna">127,60</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Jod')">
            <div class="Box-Nemetal">
              <button class="Gumb-Nemetal">
                <div class="AtomskiBroj">53</div>
                <div class="Simbol">I</div>
                <div class="Ime">Jod</div>
                <div class="Relativna">126,90</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Ksenon')">
            <div class="Box-Nemetal">
              <button class="Gumb-Nemetal">
                <div class="AtomskiBroj">54</div>
                <div class="Simbol-Plin">Xe</div>
                <div class="Ime">Ksenon</div>
                <div class="Relativna">131,29</div>
              </button>
            </div>
          </a>

        </div>

        <div class="SestaPerioda">         <!-- 6. PERIODA -->
        
          <div class="rub">6</div>

          <a class="Link" @click="handleClick('Cezij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">55</div>
                <div class="Simbol">Cs</div>
                <div class="Ime">Cezij</div>
                <div class="Relativna">132,91</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Barij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">56</div>
                <div class="Simbol">Ba</div>
                <div class="Ime">Barij</div>
                <div class="Relativna">137,33</div>
              </button>
            </div>
          </a>
          <div class="Lantanoidi">
            <div class="AtomskiBrojLanAkt">57 - 71</div>
            <div class="SimbolLanAkt">La - Lu</div>
            <div class="ImeLanAkt">Lantanoidi</div>
          </div>
          <a class="Link" @click="handleClick('Hafnij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">72</div>
                <div class="Simbol">Hf</div>
                <div class="Ime">Hafnij</div>
                <div class="Relativna">178,49</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Tantal')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">73</div>
                <div class="Simbol">Ta</div>
                <div class="Ime">Tantal</div>
                <div class="Relativna">180,95</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Volfram')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">74</div>
                <div class="Simbol">W</div>
                <div class="Ime">Volfram</div>
                <div class="Relativna">183,84</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Renij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">75</div>
                <div class="Simbol">Re</div>
                <div class="Ime">Renij</div>
                <div class="Relativna">186,21</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Osmij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">76</div>
                <div class="Simbol">Os</div>
                <div class="Ime">Osmij</div>
                <div class="Relativna">190,23</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Iridij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">77</div>
                <div class="Simbol">Ir</div>
                <div class="Ime">Iridij</div>
                <div class="Relativna">192,22</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Platina')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">78</div>
                <div class="Simbol">Pt</div>
                <div class="Ime">Platina</div>
                <div class="Relativna">195,08</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Zlato')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">79</div>
                <div class="Simbol">Au</div>
                <div class="Ime">Zlato</div>
                <div class="Relativna">196,97</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Živa')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">80</div>
                <div class="Simbol-Tekucina">Hg</div>
                <div class="Ime">Živa</div>
                <div class="Relativna">200,59</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Talij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">81</div>
                <div class="Simbol">Tl</div>
                <div class="Ime">Talij</div>
                <div class="Relativna">204,38</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Olovo')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">82</div>
                <div class="Simbol">Pb</div>
                <div class="Ime">Olovo</div>
                <div class="Relativna">207,20</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Bizmut')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBroj">83</div>
                <div class="Simbol">Bi</div>
                <div class="Ime">Bizmut</div>
                <div class="Relativna">208,98</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Polonij')">
            <div class="Box-Polumetal">
              <button class="Gumb-Polumetal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">84</div>
                  <div class="Desno"> <div>&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">84</div>-->
                <div class="Simbol">Po</div>
                <div class="Ime">Polonij</div>
                <div class="Relativna">[209]</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Astat')">
            <div class="Box-Polumetal">
              <button class="Gumb-Polumetal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">85</div>
                  <div class="Desno"> <div>&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">85</div>-->
                <div class="Simbol">At</div>
                <div class="Ime">Astat</div>
                <div class="Relativna">[210]</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Radon')">
            <div class="Box-Nemetal">
              <button class="Gumb-Nemetal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">86</div>
                  <div class="Desno"> <div>&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">86</div>-->
                <div class="Simbol-Plin">Rn</div>
                <div class="Ime">Radon</div>
                <div class="Relativna">[222]</div>
              </button>
            </div>
          </a>

        </div>

        <div class="SedmaPerioda">         <!-- 7. PERIODA -->
        
          <div class="rub">7</div>

          <a class="Link" @click="handleClick('Francij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">87</div>
                  <div class="Desno"> <div>&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">87</div>-->
                <div class="Simbol">Fr</div>
                <div class="Ime">Francij</div>
                <div class="Relativna">[223]</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Radij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">88</div>
                  <div class="Desno"> <div>&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">88</div>-->
                <div class="Simbol">Ra</div>
                <div class="Ime">Radij</div>
                <div class="Relativna">[226]</div>
              </button>
            </div>
          </a>
          <div class="Aktinoidi">
            <div class="AtomskiBrojLanAkt">89 - 103</div>
            <div class="SimbolLanAkt">Ac - Lr</div>
            <div class="ImeLanAkt">Aktinoidi</div>
          </div>
          <a class="Link" @click="handleClick('Rutherfordij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">104</div>
                  <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">104</div>-->
                <div class="Simbol">Rf</div>
                <div class="ImeDugo">Rutherfordij</div>
                <div class="Relativna">[267]</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Dubnij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">105</div>
                  <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">105</div>-->
                <div class="Simbol">Db</div>
                <div class="ImeDugo">Dubnij</div>
                <div class="Relativna">[268]</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Seaborgij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">106</div>
                  <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">106</div>-->
                <div class="Simbol">Sg</div>
                <div class="ImeDugo">Seaborgij</div>
                <div class="Relativna">[269]</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Bohrij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">107</div>
                  <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">107</div>-->
                <div class="Simbol">Bh</div>
                <div class="ImeDugo">Bohrij</div>
                <div class="Relativna">[270]</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Hassij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">108</div>
                  <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">108</div>-->
                <div class="Simbol">Hs</div>
                <div class="ImeDugo">Hassij</div>
                <div class="Relativna">[270]</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Meitnerij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">109</div>
                  <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">109</div>-->
                <div class="Simbol">Mt</div>
                <div class="ImeDugo">Meitnerij</div>
                <div class="Relativna">[277]</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Darmstadtij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">110</div>
                  <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">110</div>-->
                <div class="Simbol">Ds</div>
                <div class="ImeDugo">Darmstadtij</div>
                <div class="Relativna">[281]</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Roentgenij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">111</div>
                  <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">111</div>-->
                <div class="Simbol">Rg</div>
                <div class="ImeDugo">Roentgenij</div>
                <div class="Relativna">[282]</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Kopernicij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">112</div>
                  <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">112</div>-->
                <div class="Simbol">Cn</div>
                <div class="ImeDugo">Kopernicij</div>
                <div class="Relativna">[285]</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Nihonij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">113</div>
                  <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">113</div>-->
                <div class="Simbol">Nh</div>
                <div class="ImeDugo">Nihonij</div>
                <div class="Relativna">[286]</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Flerovij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">114</div>
                  <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">114</div>-->
                <div class="Simbol">Fl</div>
                <div class="ImeDugo">Flerovij</div>
                <div class="Relativna">[289]</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Moskovij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">115</div>
                  <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">115</div>-->
                <div class="Simbol">Mc</div>
                <div class="ImeDugo">Moskovij</div>
                <div class="Relativna">[290]</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Livermorij')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">116</div>
                  <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">116</div>-->
                <div class="Simbol">Lv</div>
                <div class="ImeDugo">Livermorij</div>
                <div class="Relativna">[293]</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Tenesin')">
            <div class="Box-Metal">
              <button class="Gumb-Metal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">117</div>
                  <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">117</div>-->
                <div class="Simbol">Ts</div>
                <div class="ImeDugo">Tenesin</div>
                <div class="Relativna">[294]</div>
              </button>
            </div>
          </a>
          <a class="Link" @click="handleClick('Oganeson')">
            <div class="Box-Metal">
              <button class="Gumb-Nemetal">
                <div class="AtomskiBrojSaSimbolima">
                  <div class="Lijevo"></div>
                  <div class="Sredinica">118</div>
                  <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                </div>
                <!--<div class="AtomskiBroj">118</div>-->
                <div class="Simbol-Plin">Og</div>
                <div class="ImeDugo">Oganeson</div>
                <div class="Relativna">[294]</div>
              </button>
            </div>
          </a>

        </div>

        <div class="Sesta--Perioda">         <!-- 6. PERIODA -->
        
          <div class="Lan">Lantanoidi</div>

          <div class="Dodatno">
            <a class="Link" @click="handleClick('Lantan')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBroj">57</div>
                  <div class="Simbol">La</div>
                  <div class="ImeDugo">Lantan</div>
                  <div class="Relativna">138,91</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Cerij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBroj">58</div>
                  <div class="Simbol">Ce</div>
                  <div class="ImeDugo">Cerij</div>
                  <div class="Relativna">140,12</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Praseodimij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBroj">59</div>
                  <div class="Simbol">Pr</div>
                  <div class="ImeDugo">Praseodimij</div>
                  <div class="Relativna">140,91</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Neodimij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBroj">60</div>
                  <div class="Simbol">Nd</div>
                  <div class="ImeDugo">Neodimij</div>
                  <div class="Relativna">144,24</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Prometij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBrojSaSimbolima">
                    <div class="Lijevo"></div>
                    <div class="Sredinica">61</div>
                    <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                  </div>
                  <!--<div class="AtomskiBroj">61</div>-->
                  <div class="Simbol">Pm</div>
                  <div class="ImeDugo">Prometij</div>
                  <div class="Relativna">[145]</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Samarij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBroj">62</div>
                  <div class="Simbol">Sm</div>
                  <div class="ImeDugo">Samarij</div>
                  <div class="Relativna">150,36</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Europij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBroj">63</div>
                  <div class="Simbol">Eu</div>
                  <div class="ImeDugo">Europij</div>
                  <div class="Relativna">151,96</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Gadolinij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBroj">64</div>
                  <div class="Simbol">Gd</div>
                  <div class="ImeDugo">Gadolinij</div>
                  <div class="Relativna">157,25</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Terbij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBroj">65</div>
                  <div class="Simbol">Tb</div>
                  <div class="ImeDugo">Terbij</div>
                  <div class="Relativna">158,93</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Disprozij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBroj">66</div>
                  <div class="Simbol">Dy</div>
                  <div class="ImeDugo">Disprozij</div>
                  <div class="Relativna">162,50</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Holomij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBroj">67</div>
                  <div class="Simbol">Ho</div>
                  <div class="ImeDugo">Holomij</div>
                  <div class="Relativna">164,93</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Erbij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBroj">68</div>
                  <div class="Simbol">Er</div>
                  <div class="ImeDugo">Erbij</div>
                  <div class="Relativna">167,26</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Tulij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBroj">69</div>
                  <div class="Simbol">Tm</div>
                  <div class="ImeDugo">Tulij</div>
                  <div class="Relativna">168,93</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Iterbij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBroj">70</div>
                  <div class="Simbol">Yb</div>
                  <div class="ImeDugo">Iterbij</div>
                  <div class="Relativna">173,05</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Lutecij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBroj">71</div>
                  <div class="Simbol">Lu</div>
                  <div class="ImeDugo">Lutecij</div>
                  <div class="Relativna">174,97</div>
                </button>
              </div>
            </a>
          </div>

        </div>

        <div class="Sedma--Perioda">       <!-- 7. PERIODA -->
          
          <div class="Akt">Aktinoidi</div>

          <div class="Dodatno">
            <a class="Link" @click="handleClick('Aktinij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBrojSaSimbolima">
                    <div class="Lijevo"></div>
                    <div class="Sredinica">89</div>
                    <div class="Desno"> <div>&#x2622;</div> </div>
                  </div>
                  <!--<div class="AtomskiBroj">89</div>-->
                  <div class="Simbol">Ac</div>
                  <div class="ImeDugo">Aktinij</div>
                  <div class="Relativna">[227]</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Torij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBrojSaSimbolima">
                    <div class="Lijevo"></div>
                    <div class="Sredinica">90</div>
                    <div class="Desno"> <div>&#x2622;</div> </div>
                  </div>
                  <!--<div class="AtomskiBroj">90</div>-->
                  <div class="Simbol">Th</div>
                  <div class="ImeDugo">Torij</div>
                  <div class="Relativna">232,04</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Protaktinij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBrojSaSimbolima">
                    <div class="Lijevo"></div>
                    <div class="Sredinica">91</div>
                    <div class="Desno"> <div>&#x2622;</div> </div>
                  </div>
                  <!--<div class="AtomskiBroj">91</div>-->
                  <div class="Simbol">Pa</div>
                  <div class="ImeDugo">Protaktinij</div>
                  <div class="Relativna">231,04</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Uranij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBrojSaSimbolima">
                    <div class="Lijevo"></div>
                    <div class="Sredinica">92</div>
                    <div class="Desno"> <div>&#x2622;</div> </div>
                  </div>
                  <!--<div class="AtomskiBroj">92</div>-->
                  <div class="Simbol">U</div>
                  <div class="ImeDugo">Uranij</div>
                  <div class="Relativna">238,03</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Neptunij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBrojSaSimbolima">
                    <div class="Lijevo"></div>
                    <div class="Sredinica">93</div>
                    <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                  </div>
                  <!--<div class="AtomskiBroj">93</div>-->
                  <div class="Simbol">Np</div>
                  <div class="ImeDugo">Neptunij</div>
                  <div class="Relativna">[237]</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Plutonij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBrojSaSimbolima">
                    <div class="Lijevo"></div>
                    <div class="Sredinica">94</div>
                    <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                  </div>
                  <!--<div class="AtomskiBroj">94</div>-->
                  <div class="Simbol">Pu</div>
                  <div class="ImeDugo">Plutonij</div>
                  <div class="Relativna">[244]</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Americij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBrojSaSimbolima">
                    <div class="Lijevo"></div>
                    <div class="Sredinica">95</div>
                    <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                  </div>
                  <!--<div class="AtomskiBroj">95</div>-->
                  <div class="Simbol">Am</div>
                  <div class="ImeDugo">Americij</div>
                  <div class="Relativna">[243]</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Kurij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBrojSaSimbolima">
                    <div class="Lijevo"></div>
                    <div class="Sredinica">96</div>
                    <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                  </div>
                  <!--<div class="AtomskiBroj">96</div>-->
                  <div class="Simbol">Cm</div>
                  <div class="ImeDugo">Kurij</div>
                  <div class="Relativna">[247]</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Berkelij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBrojSaSimbolima">
                    <div class="Lijevo"></div>
                    <div class="Sredinica">97</div>
                    <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                  </div>
                  <!--<div class="AtomskiBroj">97</div>-->
                  <div class="Simbol">Bk</div>
                  <div class="ImeDugo">Berkelij</div>
                  <div class="Relativna">[247]</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Kalifornij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBrojSaSimbolima">
                    <div class="Lijevo"></div>
                    <div class="Sredinica">98</div>
                    <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                  </div>
                  <!--<div class="AtomskiBroj">98</div>-->
                  <div class="Simbol">Cf</div>
                  <div class="ImeDugo">Kalifornij</div>
                  <div class="Relativna">[251]</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Einsteinij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBrojSaSimbolima">
                    <div class="Lijevo"></div>
                    <div class="Sredinica">99</div>
                    <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                  </div>
                  <!--<div class="AtomskiBroj">99</div>-->
                  <div class="Simbol">Es</div>
                  <div class="ImeDugo">Einsteinij</div>
                  <div class="Relativna">[252]</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Fermij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBrojSaSimbolima">
                    <div class="Lijevo"></div>
                    <div class="Sredinica">100</div>
                    <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                  </div>
                  <!--<div class="AtomskiBroj">100</div>-->
                  <div class="Simbol">Fm</div>
                  <div class="ImeDugo">Fermij</div>
                  <div class="Relativna">[257]</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Mendelevij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBrojSaSimbolima">
                    <div class="Lijevo"></div>
                    <div class="Sredinica">101</div>
                    <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                  </div>
                  <!--<div class="AtomskiBroj">101</div>-->
                  <div class="Simbol">Md</div>
                  <div class="ImeDugo">Mendelevij</div>
                  <div class="Relativna">[258]</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Nobelij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBrojSaSimbolima">
                    <div class="Lijevo"></div>
                    <div class="Sredinica">102</div>
                    <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                  </div>
                  <!--<div class="AtomskiBroj">102</div>-->
                  <div class="Simbol">No</div>
                  <div class="ImeDugo">Nobelij</div>
                  <div class="Relativna">[259]</div>
                </button>
              </div>
            </a>
            <a class="Link" @click="handleClick('Lawrencij')">
              <div class="Box-Metal">
                <button class="Gumb-Metal">
                  <div class="AtomskiBrojSaSimbolima">
                    <div class="Lijevo"></div>
                    <div class="Sredinica">103</div>
                    <div class="Desno"> <div>&#x2605;</div> <div style="margin-top: -0.3vw;">&#x2622;</div> </div>
                  </div>
                  <!--<div class="AtomskiBroj">103</div>-->
                  <div class="Simbol">Lr</div>
                  <div class="ImeDugo">Lawrencij</div>
                  <div class="Relativna">[262]</div>
                </button>
              </div>
            </a>
          </div>

        </div>
      
      </div>
      
  </div>
  </div>


</template>
<script>
  



  
  import Element from './/ElementLoad.vue'

  export default {
    components: {
      Element,
    },
    props: {
        Zag: {
          type: Boolean,
          required: true
        },
        Gale: {
          type: Boolean,
          required: true
        },
        Mine: {
          type: Boolean,
          required: true
        },
        Inde: {
          type: Boolean,
          required: true
        },
    },
    data(){
      return{
        Podatak: null,
        Pokazi: false,
        showElementLoad: false,
        Upozorenje: 1,

        Prikazi: true,
      }
    },
    methods: {
      async handleClick(Vrijednost) {
        this.Podatak = Vrijednost;
        this.showElementLoad = true; 
        
      },
      handleElementNotFound() {
        this.showElementLoad = false; 
        alert("Element nije još dostupan");
      },


      
      Min() {
        this.$emit('update-min', true);
        this.Prikazi = false;
      },
      Gal() {
        alert("Galerija još nije dostupna");
        /*this.$emit('update-gal', true);
        this.Prikazi = false;*/
      },
      changeZaglavlje() {
        this.$emit('update-zaglavlje', true);
        this.Prikazi = false;
      },
    }

  }


</script>

<style scoped>
  [v-cloak] {
        display: none;
      }
</style>