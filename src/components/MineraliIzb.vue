<template>
    <head>
      <link rel="stylesheet" href="css/Podnozje.css">
      <link rel="stylesheet" href="bootstrap-5.3.2-dist/css/bootstrap.css">
      <link rel="stylesheet" href="css/zaglavlje.css">
      <link rel="stylesheet" href="css/MineraliTest.css">
      <link rel="stylesheet" href="css/NoviGumbici.css">
      
    </head>
    <div v-if="Prikazi">
    <div style="display: flex; background-color: #454545; height: 6vh; position: relative; z-index: 100; width: 100%;">
      <div style="margin-top: -0.2vw; display: flex; width: 30%; align-items: center;"><a class="Alink" @click="changeZaglavlje()"><button class="Blink">MineralogijaHR</button></a></div>
      <div style="margin-top: -0.2vw; display: flex; width: 100%; align-items: center; color: white; justify-content: center;"><div class="Mjestooo">&#8275; Mjesto gdje su svi minerali prirodni &#8275;</div></div>
      <div style="margin-top: -0.2vw; display: flex; width: 30%; align-items: center; justify-content: right; margin-right: 1.5vw;">
        
        
  
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: transparent; border: none;">
            Menu
          </button>
          <ul class="dropdown-menu" style="height: fit-content;">
            <li><a class="dropdown-item">Minerali</a></li>
            <li><a class="dropdown-item" @click="Gal()">Galerija</a></li>
            <li><a class="dropdown-item" @click="PSE()">PSE</a></li>
          </ul>
        </div>
        
        
      </div>
    </div>
    <!--<div class="Zaglavlje" style="background-color: #454545;">
      style=" background-color: rgb(51, 51, 51); z-index: 100;"
  
      <div class="Lijevo1" style="background-color: #454545; margin-left: 2vw;">
        <a class="gumbac1" style="font-family: 'Rubik'" href="index.html">Mineralogija.hr</a>
      </div>
  
      <div class="Desno1" style="background-color: #454545">
        <a class="gumbac1-mali" style="font-family: 'Rubik';" href="PSEtest.html">PSE</a>
        <a class="gumbac1-srednji" style="font-family: 'Rubik'; background-color: orangered; color: black; " href="Minerali.html">Minerali</a>
        <a class="gumbac1-srednji" style="font-family: 'Rubik';" href="Galerija.html">Galerija</a>
      </div>
  
    </div>-->

    <!-- Informacije -->
    
    <!--<div class="Uvod-Okvir">
      <p class="Uvod">MINERALI</p>
    </div>
    <div style="color: white; background-color: royalblue; padding: 0.5vw; font-size: 1.5vw; width: 100%; display: flex; justify-content: center; border-bottom: solid black 0.25vw;">&#10097; &nbsp;&#10097; &nbsp;&#10097; &nbsp;Svi minerali su prirodni ukoliko u opisu slike nije navedeno drugačije &nbsp;&#10096; &nbsp;&#10096; &nbsp;&#10096;</div>
    -->
    <!-- Minerali -->



    <div class="Rešetka">

      <a class="LNovi" href="Stranice-sa-mineralima/AhatNovi.html">
        <img class="SlikaNova" src="../Slike/Spremne slike/PlaviAhat-minTest.jpg" alt="">
        <p class="ImeNovo">Ahat</p>
        <p class="FormulaNova">SiO<sub class="SubSet">2</sub></p>
      </a>

      <a class="LNovi" href="Stranice-sa-mineralima/AkvamarinNovi.html">
        <img class="SlikaNova" src="../Slike/Spremne slike/Akvatest-minTest.jpg">
        <p class="ImeNovo">Akvamarin</p>
        <p class="FormulaNova">Be<sub class="SubSet">3</sub>Al<sub class="SubSet">2</sub>Si<sub class="SubSet">6</sub>O<sub class="SubSet">18</sub></p>
      </a>

      <!--<a class="LNovi" href="Stranice-sa-mineralima/AmazonitNovi.html">
        <img class="SlikaNova" src="Slike/Amazonit.jpg" alt="">
        <p class="ImeNovo">Amazonit</p>
        <p class="FormulaNova">KAlSi<sub>3</sub>O<sub>8</sub></p>
      </a>-->

      <a class="LNovi" href="Stranice-sa-mineralima/AmetistNovi.html">
        <img class="SlikaNova" src="../Slike/Spremne slike/Ametist-minTest.jpg" alt="">
        <p class="ImeNovo">Ametist</p>
        <p class="FormulaNova">SiO<sub class="SubSet">2</sub></p>
      </a>

      <!--<a class="LNovi" href="Stranice-sa-mineralima/AngelitNovi.html">
        <img class="SlikaNova" src="Slike/Angelit.jpg" alt="">
        <p class="ImeNovo">Angelit</p>
        <p class="FormulaNova">CaSO<sub>4</sub></p>
      </a>-->

      <!--<a class="LNovi" href="Stranice-sa-mineralima/ApatitNovi.html">
        <img class="SlikaNova" src="Slike/Zeleni_apatit.jpg" alt="">
        <p class="ImeNovo">Apatit</p>
        <p class="FormulaNova">Ca<sub>5</sub>(PO<sub>4</sub>)<sub>3</sub>(Cl/F/OH)</sub></p>
      </a>-->

      <a class="LNovi" href="Stranice-sa-mineralima/AragonitNovi.html">
        <img class="SlikaNova" src="../Slike/Spremne slike/Aragonit-minTest.jpg" alt="">
        <p class="ImeNovo">Aragonit</p>
        <p class="FormulaNova">Ca(CO<sub class="SubSet">3</sub>)</p>
      </a>

      <!--<a class="LNovi" href="Stranice-sa-mineralima/AstrofilitNovi.html">
        <img class="SlikaNova" src="Slike/Astrofilit.jpg" alt="">
        <p class="ImeNovo">Astrofilit</p>
        <p class="FormulaNova">K<sub>2</sub>Na(Fe<sup>2+</sup>,Mn)<sub>7</sub>Ti<sub>2</sub>Si<sub>8</sub>O<sub>26</sub>(OH)<sub>4</sub></p>
      </a>-->

      <!--<a class="LNovi" href="Stranice-sa-mineralima/AventurinNovi.html">
        <img class="SlikaNova" src="Slike/Aventurin.jpg" alt="">
        <p class="ImeNovo">Aventurin</p>
        <p class="FormulaNova">SiO<sub>2</sub></p>
      </a>-->

      <a class="LNovi" href="Stranice-sa-mineralima/AzuritNovi.html">
        <img class="SlikaNova" src="../Slike/Spremne slike/Azurit-minTest.jpg" alt="">
        <p class="ImeNovo">Azurit</p>
        <p class="FormulaNova">Cu<sub class="SubSet">3</sub>(CO<sub class="SubSet">3</sub>)<sub class="SubSet">2</sub>(OH)<sub class="SubSet">2</sub></p>
      </a>

      <!--<a class="LNovi" href="Stranice-sa-mineralima/BaritNovi.html">
        <img class="SlikaNova" src="Slike/Barit.jpg" alt="">
        <p class="ImeNovo">Barit</p>
        <p class="FormulaNova">BaSO<sub>4</sub></p>
      </a>-->

      <a class="LNovi" href="Stranice-sa-mineralima/CijanitNovi.html">
        <img class="SlikaNova" src="../Slike/Spremne slike/Cij1-minTest.jpg" alt="">
        <p class="ImeNovo">Cijanit</p>
        <p class="FormulaNova">Al<sub class="SubSet">2</sub>OSiO<sub class="SubSet">4</sub></p>
      </a>

      <!--<a class="LNovi" href="Stranice-sa-mineralima/Dimni_kvarcNovi.html">
        <img class="SlikaNova" src="Slike/Dimni_kvarc.jpg" alt="">
        <p class="ImeNovo">Dimni kvarc</p>
        <p class="FormulaNova">SiO<sub>2</sub></p>
      </a>-->

      <a class="LNovi" href="Stranice-sa-mineralima/FlogopitNovi.html">
        <img class="SlikaNova" src="../Slike/Spremne slike/Flogopit-minTest.jpg" alt="">
        <p class="ImeNovo">Flogopit</p>
        <p class="FormulaNova">KMg<sub class="SubSet">3</sub>(AlSi<sub class="SubSet">3</sub>O<sub class="SubSet">10</sub>)(OH)<sub class="SubSet">2</sub></p>
      </a>

      <a class="LNovi" href="Stranice-sa-mineralima/FluoritNovi.html">
        <img class="SlikaNova" src="../Slike/Spremne slike/Fluotest-minTest.jpg" alt="">
        <p class="ImeNovo">Fluorit</p>
        <p class="FormulaNova">CaF<sub class="SubSet">2</sub></p>
      </a>

      <!--<a class="LNovi" href="Stranice-sa-mineralima/FuksitNovi.html">
        <img class="SlikaNova" src="Slike/Fuksit.jpg" alt="">
        <p class="ImeNovo">Fuksit</p>
        <p class="FormulaNova">K(Al,Cr)<sub>3</sub>Si<sub>3</sub>O<sub>10</sub>(OH)<sub>2</sub></p>
      </a>-->

      <!--<a class="LNovi" href="Stranice-sa-mineralima/GranatNovi.html">
        <img class="SlikaNova" src="Slike/Granat.jpg" alt="">
        <p class="ImeNovo">Granat</p>
        <p class="FormulaNova">X<sub>3</sub>Z<sub>2</sub>(SiO<sub>4</sub>)<sub>3</sub></p>
      </a>-->

      <a class="LNovi" href="Stranice-sa-mineralima/HalkopiritNovi.html">
        <img class="SlikaNova" src="../Slike/Spremne slike/Halk4-minTest.jpg" alt="">
        <p class="ImeNovo">Halkopirit</p>
        <p class="FormulaNova">CuFeS<sub class="SubSet">2</sub></p>
      </a>

      <a class="LNovi" href="Stranice-sa-mineralima/HematitNovi.html">
        <img class="SlikaNova" src="../Slike/Spremne slike/Hematit-minTest.jpg" alt="">
        <p class="ImeNovo">Hematit</p>
        <p class="FormulaNova">Fe<sub class="SubSet">2</sub>O<sub class="SubSet">3</sub></p>
      </a>

      <!--<a class="LNovi" href="Stranice-sa-mineralima/KalcitNovi.html">
        <img class="SlikaNova" src="Slike/Žuti_kalcit.jpg" alt="">
        <p class="ImeNovo">Kalcit</p>
        <p class="FormulaNova">CaCO<sub>3</sub></p>
      </a>-->

      <!--<a class="LNovi" href="Stranice-sa-mineralima/KrizoprasNovi.html">
        <img class="SlikaNova" src="Slike/Krizopras.jpg" alt="">
        <p class="ImeNovo">Krizopras</p>
        <p class="FormulaNova">SiO<sub>2</sub></p>
      </a>-->

      <!--<a class="LNovi" href="Stranice-sa-mineralima/KunzitNovi.html">
        <img class="SlikaNova" src="Slike/Kunzit.jpg" alt="">
        <p class="ImeNovo">Kunzit</p>
        <p class="FormulaNova">LiAlSi<sub>2</sub>O<sub>6</sub></p>
      </a>-->

      <!--<a class="LNovi" href="Stranice-sa-mineralima/Kvarc_mliječnjakNovi.html">
        <img class="SlikaNova" src="Slike/Geoda_otvorena.jpg" alt="">
        <p class="ImeNovo">Kvarc mliječnjak</p>
        <p class="FormulaNova">SiO<sub>2</sub></p>
      </a>-->

      <!--<a class="LNovi" href="Stranice-sa-mineralima/Kvarc_proziracNovi.html">
        <img class="SlikaNova" src="Slike/Kvarc_prozirac-min.jpg" alt="">
        <p class="ImeNovo">Kvarc prozirac</p>
        <p class="FormulaNova">SiO<sub>2</sub></p>
      </a>-->

      <!--<a class="LNovi" href="Stranice-sa-mineralima/LabradoritNovi.html">
        <img class="SlikaNova" src="Slike/Labradorit.jpg" alt="">
        <p class="ImeNovo">Labradorit</p>
        <p class="FormulaNova">(Ca,Na)(Al,Si)<sub>4</sub>O<sub>8</sub></p>
      </a>-->

      <a class="LNovi" href="Stranice-sa-mineralima/LepidolitNovi.html">
        <img class="SlikaNova" src="../Slike/Spremne slike/Lepidolit-minTest.jpg" alt="">
        <p class="ImeNovo">Lepidolit</p>
        <p class="FormulaNova">K(Li,Al<sub class="SubSet">3</sub>)(Al,Si<sub class="SubSet">3</sub>)O<sub class="SubSet">10</sub>(OH,F)<sub class="SubSet">2</sub></p>
      </a>

      <a class="LNovi" href="Stranice-sa-mineralima/MalahitNovi.html">
        <img class="SlikaNova" src="../Slike/Spremne slike/Malahit-minTest.jpg" alt="">
        <p class="ImeNovo">Malahit</p>
        <p class="FormulaNova">Cu<sub class="SubSet">2</sub>(CO<sub class="SubSet">3</sub>)(OH)<sub class="SubSet">2</sub></p>
      </a>

      <!--<a class="LNovi" href="Stranice-sa-mineralima/MuskovitNovi.html">
        <img class="SlikaNova" src="Slike/Muskovit.jpg" alt="">
        <p class="ImeNovo">Muskovit</p>
        <p class="FormulaNova">KAl<sub>2</sub>(Si<sub>3</sub>,Al)O<sub>10</sub>(OH,F)<sub>2</sub></p>
      </a>-->

      <!--<a class="LNovi" href="Stranice-sa-mineralima/PeridotNovi.html">
        <img class="SlikaNova" src="Slike/Peridot.jpg" alt="">
        <p class="ImeNovo">Peridot</p>
        <p class="FormulaNova">Mg<sub>2</sub>SiO<sub>4</sub></p>
      </a>-->

      <a class="LNovi" href="Stranice-sa-mineralima/PiritNovi.html">
        <img class="SlikaNova" src="../Slike/Spremne slike/PiritKocka-minTest.jpg" alt="">
        <p class="ImeNovo">Pirit</p>
        <p class="FormulaNova">FeS<sub class="SubSet">2</sub></p>
      </a>

      <a class="LNovi" href="Stranice-sa-mineralima/PiroluzitNovi.html">
        <img class="SlikaNova" src="../Slike/Spremne slike/Piroluzit-minTest.jpg" alt="">
        <p class="ImeNovo">Piroluzit</p>
        <p class="FormulaNova">MnO<sub class="SubSet">2</sub></p>
      </a>

      <!--<a class="LNovi" href="Stranice-sa-mineralima/PurpuritNovi.html">
        <img class="SlikaNova" src="Slike/Purpurit.jpg" alt="">
        <p class="ImeNovo">Purpurit</p>
        <p class="FormulaNova">Mn<sup>3+</sup>(PO<sub>4</sub>)</p>
      </a>-->

      <!--<a class="LNovi" href="Stranice-sa-mineralima/Pustinjska_ružaNovi.html">
        <img class="SlikaNova" src="Slike/Pustinjska_ruža.jpg" alt="">
        <p class="ImeNovo">Pustinjska ruža</p>
        <p class="FormulaNova">CaSO<sub>4</sub> &#183; 2H<sub>2</sub>O</p>
      </a>-->

      <!--<a class="LNovi" href="Stranice-sa-mineralima/RozenkvarcNovi.html">
        <img class="SlikaNova" src="Slike/Rozenkvarc.jpg" alt="">
        <p class="ImeNovo">Rozenkvarc</p>
        <p class="FormulaNova">SiO<sub>2</sub></p>
      </a>-->

      <!--<a class="LNovi" href="Stranice-sa-mineralima/SafirNovi.html">
        <img class="SlikaNova" src="Slike/Safir.jpg" alt="">
        <p class="ImeNovo">Safir</p>
        <p class="FormulaNova">Al<sub>2</sub>O<sub>3</sub></p>
      </a>-->

      <!--<a class="LNovi" href="Stranice-sa-mineralima/SelenitNovi.html">
        <img class="SlikaNova" src="Slike/Selenit.jpg" alt="">
        <p class="ImeNovo">Selenit</p>
        <p class="FormulaNova">CaSO<sub>4</sub> &#183; 2H<sub>2</sub>O</p>
      </a>-->

      <!--<a class="LNovi" href="Stranice-sa-mineralima/SmaragdNovi.html">
        <img class="SlikaNova" src="Slike/Smaragd.jpg" alt="">
        <p class="ImeNovo">Smaragd</p>
        <p class="FormulaNova">Be<sub>3</sub>Al<sub>2</sub>(Si<sub>6</sub>O<sub>18</sub>)</p>
      </a>-->

      <!--<a class="LNovi" href="Stranice-sa-mineralima/TalkNovi.html">
        <img class="SlikaNova" src="Slike/Talk.jpg" alt="">
        <p class="ImeNovo">Talk</p>
        <p class="FormulaNova">Mg<sub>3</sub>Si<sub>4</sub>O<sub>10</sub>(OH)<sub>2</sub></p>
      </a>-->

      <!--<a class="LNovi" href="Stranice-sa-mineralima/TanzanitNovi.html">
        <img class="SlikaNova" src="Slike/Tanzanit.jpg" alt="">
        <p class="ImeNovo">Tanzanit</p>
        <p class="FormulaNova">{Ca<sub>2</sub>}{Al<sub>3</sub>}(SiO<sub>4</sub>)<sub>3</sub>(OH)</p>
      </a>-->

      <!--<a class="LNovi" href="Stranice-sa-mineralima/Tigrovo_okoNovi.html">
        <img class="SlikaNova" src="Slike/Tigrovo_oko.jpg" alt="">
        <p class="ImeNovo">Tigrovo oko</p>
        <p class="FormulaNova">SiO<sub>2</sub></p>
      </a>-->

      <a class="LNovi" href="/Stranice-sa-mineralima/TirkizNovi.html">
        <img class="SlikaNova" src="../Slike/Spremne slike/Tirkiz-minTest.jpg" alt="">
        <p class="ImeNovo">Tirkiz</p>
        <p class="FormulaNova">CuAl<sub class="SubSet">6</sub>(PO<sub class="SubSet">4</sub>)<sub class="SubSet">4</sub>(OH)<sub class="SubSet">8</sub>&nbsp;&#183; 4H<sub class="SubSet">2</sub>O</p>
      </a>

      <!--<a class="LNovi" href="Stranice-sa-mineralima/TurmalinNovi.html">
        <img class="SlikaNova" src="Slike/Turmalin.jpg" alt="">
        <p class="ImeNovo">Turmalin</p>
        <p class="FormulaNova">AD<sub>3</sub>G<sub>6</sub>(T<sub>6</sub>O<sub>18</sub>)(BO<sub>3</sub>)<sub>3</sub>X<sub>3</sub>Z</p>
      </a>-->

    </div>
      
    <div class="Podnožje">
 
      

      <div class="Prozorce">
        <div>
          <div style="padding: 0.3vw 2vw; display: flex; align-items: center; font-size: 1vw;"><a href="#" target="" class="PreLinking"><img src="Ikone/facebook_145802.png" class="Linking" >MineralogijaHR</a></div>
          <div style="padding: 0.3vw 2vw; display: flex; align-items: center; font-size: 1vw;"><a href="#" target="" class="PreLinking"><img src="Ikone/instagram_3670125.png" class="Linking">Mineralogija_Hr</a></div>
        </div>
        <div>
          <div style="padding: 0.3vw 2vw; display: flex; align-items: center; font-size: 1vw;"><a href="#" target="" class="PreLinking"><img src="Ikone/gmail_5968534.png" class="Linking">Mineralogija.Hr@gmail.com</a></div>
          <div style="padding: 0.3vw 2vw; display: flex; align-items: center; font-size: 1vw;"><a href="#" target="" class="PreLinking"><img src="Ikone/5296521_play_video_vlog_youtube_youtube logo_icon.svg" class="Linking">MineralogijaHr</a></div>  
        </div>
      </div>
  
      <div class="ObjasnjenaSet">
        <div class="AAutor">Autor: Bruno Hledik</div>
        <div class="TText">Pratite novosti i moja putovanja na Instagramu i Facebooku.</div>
        <div class="TText">Prijavite grešku na gmail uz literaturu iz koje je informacija dobivena.</div>
        <div class="TText">Pogledajte kolekciju elemenata i minerala na YouTubeu.</div>
        <div class="TText">Svi primjerci su prirodni ukoliko u opisu slike nije navedeno drugačije.</div>
        <div class="TTText">&copy; Bruno Hledik 2023. All right reserved</div>
      </div>
  
    </div>
    </div>


    


</template>



<script>

export default {
    data() {
      return{
        Prikazi: true,
      }
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
        PSEe: {
          type: Boolean,
          required: true
        },
      },
      methods: {
        changeZaglavlje() {
          this.$emit('update-zaglavlje', true);
          this.Prikazi = false;
        },
        PSE() {
          this.$emit('update-PSE', true);
          this.Prikazi = false;
        },
        Gal() {
          alert("Galerija još nije dostupna");
          /*this.$emit('update-gal', true);
          this.Prikazi = false;*/
        },
        
      },
}
</script>
































<style scoped>

      *{
        box-sizing: content-box;
        font-family: 'rubik';
        font-weight: 600;
      }
      p{
        margin: 0;
      }
      @media (min-width: 1200px){

      }
      @media (max-width: 1399px){

      }
      @media (max-width: 1199px){

      }
      @media (max-width: 991px){
        
        .LNovi{
          width: 25vw;
          height: 30vw;
          margin: 1vw;
        }
        .ImeNovo{
          font-size: 1.3rem;
        }
        .FormulaNova{
          font-size: 0.9rem;
        }
        .SubSet{
          font-size: 0.7rem;
        }
        .SubSet2{
          font-size: 0.7rem;
        }
        .SupSet{
          font-size: 0.7rem;
        }
      }
      @media (max-width: 767px){
        .LNovi{
          width: 25vw;
          height: 30vw;
          margin: 1vw;
        }
        .ImeNovo{
          font-size: 1rem;
        }
        .FormulaNova{
          font-size: 0.7rem;
        }
        .SubSet{
          font-size: 0.55rem;
        }
        .SubSet2{
          font-size: 0.55rem;
        }
        .SupSet{
          font-size: 0.55rem;
        }
      }
      @media (max-width: 575px){
        .LNovi{
          width: 25vw;
          height: 30vw;
          margin: 1vw;
        }
        .ImeNovo{
          font-size: 0.8rem;
        }
        .FormulaNova{
          font-size: 0.55rem;
        }
        .SubSet{
          font-size: 0.4rem;
        }
        .SubSet2{
          font-size: 0.4rem;
        }
        .SupSet{
          font-size: 0.4rem;
        }
      }
      .dropdown-menu,.dropdown,.dropdown-item,.Lili,.btn,
      .dropdown-menu::after,.dropdown::after,.dropdown-item::after,.Lili::after,.btn::after,
      .dropdown-menu::before,.dropdown::before,.dropdown-item::before,.Lili::before,.btn::before{
        box-sizing: border-box;
        font-family: 'rubik';
        font-weight: 600;
      }
      .btn{
        font-weight: 300;
      }

    
</style>