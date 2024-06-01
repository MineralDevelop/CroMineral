<template>
  
  <div v-if="this.Zaglavlje === true">

  <div v-if="this.Zaglavlje === true" class="ZGL">
    <head>
      <link rel="stylesheet" href="bootstrap-5.3.2-dist/css/bootstrap.css">
      <link rel="stylesheet" href="css/zaglavlje.css">
      <link rel="stylesheet" href="css/blog.css">
      <link rel="stylesheet" href="css/NoviGumbici.css">
      <link rel="stylesheet" href="css/Slider.css">
      <link rel="stylesheet" href="css/Podnozje.css">
      
      <meta name="description" content="Koračite u svijet ispod površine Zemlje i otkrite što sve priroda može stvoriti!">
      <meta name="keywords" content="MineralogijaHR, Cromineral, Svijet minerala">
    </head>
    <div style="margin-top: -0.2vw; display: flex; width: 30%; align-items: center;"><a class="Alink" ><button class="Blink">MineralogijaHR</button></a></div>
    <div style="margin-top: -0.2vw; display: flex; width: 100%; align-items: center; color: white; justify-content: center;"><div class="Mjestooo">&#8275; Mjesto gdje su svi minerali prirodni &#8275;</div></div>
    <div style="margin-top: -0.2vw; display: flex; width: 30%; align-items: center; justify-content: right; margin-right: 1.5vw;">
      <div class="dropdown">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="background-color: transparent; border: none;">
          Menu
        </button>
        <ul class="dropdown-menu" style="height: fit-content;">
          <li><a class="dropdown-item" @click="Min()">Minerali</a></li>
          <li><a class="dropdown-item" @click="Gal()">Galerija</a></li>
          <li><a class="dropdown-item" @click="PSE()">PSE</a></li>
        </ul>
      </div>
    </div>
  </div>
  
  <div class="CSSgal">

    <!-- NE STAVLJAJ U DRUGI ELEMENT V -->
    <s id="s1"></s> 
    <s id="s2"></s>
    <s id="s3"></s>
    <s id="s4"></s>
    <s id="s5"></s>
    <s id="s6"></s>
    <s id="s7"></s>
    <!-- NE STAVLJAJ U DRUGI ELEMENT _ -->

    <div class="slider">
      <div style="background:rgb(51, 51, 51);">
        <div class="OPIS" style="display: flex; padding: 1rem; justify-content: start; align-items: end; height: 100%; ">Uvarovit - Ca<sub class="SubSet">3</sub>Cr<sub class="SubSet">2</sub>(SiO<sub class="SubSet">4</sub>)<sub class="SubSet">3</sub></div>
        <img style="height: 100%; width: 100%; object-fit: cover;" src="Slike/Naslovna/Uvarovit.jpg" alt="">
      </div>
      <div style="background:rgb(51, 51, 51);">
        <div class="OPIS" style="display: flex; padding: 1rem; justify-content: start; align-items: end; height: 100%;">Eritrit - Co<sub class="SubSet">3</sub>(AsO<sub class="SubSet">4</sub>)<sub class="SubSet">2</sub>&nbsp;&#183; 8H<sub class="SubSet">2</sub>O</div>
        <img style="height: 100%; width: 100%; object-fit: cover;" src="Slike/Naslovna/Eritrit.jpg" alt="">
      </div>
      <div style="background:rgb(51, 51, 51);">
        <div class="OPIS" style="display: flex; padding: 1rem; justify-content: start; align-items: end; height: 100%;">Kavansit - Ca(VO)Si<sub class="SubSet">4</sub>O<sub class="SubSet">10</sub>&nbsp;&#183; 4H<sub class="SubSet">2</sub>O</div>
        <img style="height: 100%; width: 100%; object-fit: cover; " src="Slike/Naslovna/Kavansit.jpg" alt="">
      </div>
      <div style="background:rgb(51, 51, 51);">
        <div class="OPIS" style="display: flex; padding: 1rem; justify-content: start; align-items: end; height: 100%;">Astrofilit - K<sub class="SubSet">2</sub>NaFe<sup class="SupSet">2+</sup><sub class="SubSet">7</sub>Ti<sub class="SubSet">2</sub>Si<sub class="SubSet">8</sub>O<sub class="SubSet">26</sub>(OH)<sub class="SubSet">4</sub>F</div>
        <img style="height: 100%; width: 100%; object-fit: cover;" src="Slike/Naslovna/Astrofilit2.jpg" alt="">
      </div>
      <div style="background:rgb(51, 51, 51);">
        <div class="OPIS" style="display: flex; padding: 1rem; justify-content: start; align-items: end; height: 100%;">Wulfenit - Pb(MoO<sub class="SubSet">4</sub>)</div>
        <img style="height: 100%; width: 100%; object-fit: cover;" src="Slike/Naslovna/Wulfenit.jpg" alt="">
      </div>
      <div style="background:rgb(51, 51, 51);">
        <div class="OPIS" style="display: flex; padding: 1rem; justify-content: start; align-items: end; height: 100%;">Kvarc prozirac - SiO<sub class="SubSet">2</sub></div>
        <img style="height: 100%; width: 100%; object-fit: cover;" src="Slike/Naslovna/KvarcProzirac.jpg" alt="">
      </div>
      <div style="background:rgb(51, 51, 51);">
        <div class="OPIS" style="display: flex; padding: 1rem; justify-content: start; align-items: end; height: 100%;">Turmalin - AD<sub class="SubSet">3</sub>G<sub class="SubSet">6</sub>(T<sub class="SubSet">6</sub>O<sub class="SubSet">18</sub>)(BO<sub class="SubSet">3</sub>)<sub class="SubSet">3</sub>X<sub class="SubSet">3</sub>Z</div>
        <img style="height: 100%; width: 100%; object-fit: cover;" src="Slike/Naslovna/Turmalin.jpg" alt="">
      </div>
    </div>
    <div class="prevNext">
      <div><a href="#s7"><b>&#8249;</b></a><a href="#s2"><b>&#8250;</b></a></div>
      <div><a href="#s1"><b>&#8249;</b></a><a href="#s3"><b>&#8250;</b></a></div>
      <div><a href="#s2"><b>&#8249;</b></a><a href="#s4"><b>&#8250;</b></a></div>
      <div><a href="#s3"><b>&#8249;</b></a><a href="#s5"><b>&#8250;</b></a></div>
      <div><a href="#s4"><b>&#8249;</b></a><a href="#s6"><b>&#8250;</b></a></div>
      <div><a href="#s5"><b>&#8249;</b></a><a href="#s7"><b>&#8250;</b></a></div>
      <div><a href="#s6"><b>&#8249;</b></a><a href="#s1"><b>&#8250;</b></a></div>
    </div>
    <div class="bullets">
      <a href="#s1"></a>
      <a href="#s2"></a>
      <a href="#s3"></a>
      <a href="#s4"></a>
      <a href="#s5"></a>
      <a href="#s6"></a>
      <a href="#s7"></a>
    </div>
  </div>

  <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>

  

  </div>
  
  

  <div v-if="PSEShow">
    <PSE :Zag='Zaglavlje' @update-zaglavlje="updateZaglavlje" :Mine='MineralShow' @update-min="updateMinerali" :Gale='GalerijaShow' @update-gal="updateGalerija" :PSEe='PSEShow' @update-PSE="updatePSE"></PSE>
  </div>
  <div v-if="MineralShow">
    <MineraliIzbornik  :Zag='Zaglavlje' @update-zaglavlje="updateZaglavlje" :PSEe='PSEShow' @update-PSE="updatePSE" :Gale='GalerijaShow' @update-gal="updateGalerija"></MineraliIzbornik>
  </div>
  <div v-if="GalerijaShow">
    <GalerijaMinerala></GalerijaMinerala>
  </div>
   <!--   <Dodaj/>    -->
   <!--   <DodavanjeEle/>  -->  
   <!--  <DodavanjeMinerala/>   --> 
  <Podnozje/>
</template>
<script>


import PSE from './components/PSE.vue'
import GalerijaMinerala from './components/GalerijaMin.vue'
import MineraliIzbornik from './components/MineraliIzb.vue'
import Podnozje from './components/PodnozjeStr'
// import DodavanjeMinerala from './components/UpisZaMineralIzb'
//import DodavanjeEle from './components/DodavanjeElemenata.vue'
//import Dodaj from './components/DodavanjeMinerala.vue'

export default {
  
  
  data(){
    return{
      PSEShow: false,
      MineralShow: false,
      GalerijaShow: false,
      Zaglavlje: true,
      PicURL: null,

      proba: true
    }
  },
  components: {
      PSE,
      Podnozje,
    //   DodavanjeMinerala,
    //  Dodaj,
      GalerijaMinerala,
      MineraliIzbornik,
   //   DodavanjeEle,
  },
  methods: {










      PSE() {
        this.PSEShow = true;
        this.Zaglavlje = false;
      },
      Min() {
        this.MineralShow = !this.MineralShow;
        this.Zaglavlje = false;
      },
      Gal() {
        alert("Galerija još nije dostupna");
        /*this.GalerijaShow = !this.GalerijaShow;
        this.Zaglavlje = false;*/
      },
      updateZaglavlje(Zag) {
        if(Zag === true){
          this.Zaglavlje = Zag;
          this.PSEShow = false;
          this.MineralShow = false;
          this.GalerijaShow = false;
          document.title = 'CroMineral';
        }
      },
      updateMinerali(Mine) {
        if(Mine === true){
          this.PSEShow = false;
          this.MineralShow = true;
          this.GalerijaShow = false;
        }
      },
      updateGalerija(Gale) {
        if(Gale === true){
          this.PSEShow = false;
          this.MineralShow = false;
          this.GalerijaShow = true;
        }
      },
      updatePSE(PSEe) {
        if(PSEe === true){
          this.PSEShow = true;
          this.MineralShow = false;
          this.GalerijaShow = false;
        }
      },
      },
  created() {
    document.title = 'CroMineral';
  }
}
</script>
<style scoped>
  .SubSet2{
      vertical-align: top;
      position: relative;
      font-size: 0.7vw;
      top: 0.6vw;
      font-weight: 600;
    }
    .SubSet{
      vertical-align: top;
      position: relative;
      font-size: 0.8vw;
      top: 0.2vw;
      font-weight: 600;
    }
    .SupSet{
      vertical-align: bottom;
      position: relative;
      font-size: 0.7vw;
      top: -0.8vw;
      font-weight: 600;
    }

    .dropdown-item{
      font-family: 'rubik';
      font-weight: 600;
    }

    @media (min-width: 1200px) {
      .Responzivni-Font {
        font-size: 1rem;
      }
      .RespNaslov{
        font-size: 1.2rem;
      }
      .RespTxt{
        text-align: justify;
      }
      .DinamickiAutor{
        font-size: 0.8rem;
      }
    }
    
    @media (max-width: 1399px) {
      .Responzivni-Font {
        font-size: 1.8rem;
      }
      .RespNaslov{
        font-size: 2rem;
      }
      .RespTxt{
        text-align: justify;
      }
      .DinamickiAutor{
        font-size: 1.2rem;
      }
    }

    @media (max-width: 1199px) {
      .Responzivni-Font {
        font-size: 2rem;
      }
      .RespNaslov{
        font-size: 1.2rem;
      }
      .RespTxt{
        text-align: justify;
      }
      .DinamickiAutor{
        font-size: 0.8rem;
      }
      .Pravo{
        top: 3.7vw;
        font-size: 1.5vw;
      }
    }
    
    @media (max-width: 991px) {
      .Responzivni-Font {
        font-size: 2.2rem;
      }
      .RespNaslov{
        font-size: 1.2rem;
      }
      .RespTxt{
        text-align: justify;
      }
      .DinamickiAutor{
        font-size: 0.8rem;
      }
      .Pravo{
        top: 7.5vw;
      }
    }

    @media (max-width: 767px) {
      .Responzivni-Font {
        font-size: 2.4rem;
      }
      .RespNaslov{
        font-size: 1.2rem;
      }
      .RespTxt{
        text-align: justify;
      }
      .DinamickiAutor{
        font-size: 0.8rem;
      }
      .Pravo{
        top: 7.6vw;
        font-size: 2vw;
      }
    }

    @media (max-width: 575px) {
      .Responzivni-Font {
        font-size: 2.6rem;
      }
      .RespNaslov{
        font-size: 1.2rem;
      }
      .RespTxt{
        text-align: justify;
      }
      .DinamickiAutor{
        font-size: 0.8rem;
      }
    }
</style>