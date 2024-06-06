<template>
  
  <div v-if="this.Zaglavlje === true">
    <body class="BCK">
      
    
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
  
    <div class="slideshow">
      <div v-for="(slide, index) in slides" :key="index">
        <img :src="slide.src" :alt="'Slide ' + (index + 1)" :style="{ transform: slide.transform, zIndex: slide.zIndex }">
        <div class="slide-text" v-if="currentSlide === index">{{ slide.text }}</div>
      </div>
    </div>
  <br><br>

  <div class="OKV">
    <div class="OKG">
      <div class="TOP">CroMineral</div>
      <br>  
      <div class="MID">
        Dobrodošli u svijet ispod površine Zemlje, u svijet koji priroda skriva od Vas.
        Ovdje možete saznati sve o mineralima i elementima, bilo to identifikacija
        minerala, želja za učenjem nečega novoga, priprema za test iz kemije ili
        gledanje slika iz razonode, uvijek ste dobrodošli! Trudim se svakim danom,
        svakim putovanjem i sajmom, pa i svakom kupnjom ljudima približiti svijet
        minerala kakav on zaista jest, bez lažnih minerala i informacija i sa što više
        dokaza, slika i obajšnjenja. Zahvalan sam na Vašem dolasku i nadam se da
        će CroMineral na Vas ostaviti dobar dojam.
      </div>
      <br> 
    </div>

    <div class="OKG"> 
      <div class="Spojeno">
        <div>
          <img style="width: 30vw" src="/Slike/Periodni.jpg.png" alt="">
        </div>
        <div class="Lijevo">
          <div class="NaslovL">
            Periodni sustav elemenata
          </div>
          <div class="TekstL">
            Na stranici možete pronaći periodni sustav elemenata, u kojem na odabir elementa dobijete najvažnije o elementu, kemijska svojstva i listu minerala.
          </div> 
        </div>
      </div>
    </div>

    <div class="OKG"> 
      <div class="Spojeno">
        
        <div class="Desno">
          <div class="NaslovR">
            Minerali
          </div>
          <div class="TekstR">
            Spisak minerala iz vlastite kolekcije omogućuje odabir minerala i otvara informacije o istome te fizička i kemijska svojstva i kristalografiju.
          </div> 
        </div>
        <div>
          <img style="width: 30vw" src="/Slike/Minerali.png" alt="">
        </div>
      </div>
    </div>

    <div class="OKG"> 
      <div class="Spojeno">
        <div>
          <img style="width: 30vw" src="/Slike/Periodni.jpg.png" alt="">
        </div>
        <div class="Lijevo">
          <div class="NaslovL">
            Galerija
          </div>
          <div class="TekstL">
            U galeriji možete pronaći više slika minerala nego što je prikazano na njegovoj stranici, a često i makrofotografije.
          </div> 
        </div>
      </div>
    </div>

  </div>



  <!--
    <div class="OKG">
    <div class="TOP">NAPISI ZA: CILJEVE, posebno pse, minerali, galerija i dodaj slike, za koga je namjenjena O stranici</div>
    <br>  
    <div class="MID">
      Na stranici možete pronaći periodni sustav elemenata, u kojem na odabir elementa
      dobijete najvažnije o elementu, kemijska svojstva i listu minerala.
      Zatim je tu
      Spisak minerala iz vlastite kolekcije omogučuje odabir minerala i otvara informacije
      o istome te fizička i kemijska svojstva i kristalografiju. U galeriji možete pronaći
      više slika minerala, a često i makrofotografije. Svi slikani minerali na stranici
      su iz vlastite kolekcije, potvrđeni pravi primjerci identificirani izvršavanjem testova
      i uspoređivanjem slika istog minerala s istog nalazišta. Ako je u pitanju spoznavanje
      lažnog primjerka minerala, to će biti jasno naznačeno uz sliku.
    </div>
    <br>  
    <div class="BOT">Vaš autor, Bruno Hledik</div>
  </div>
-->
  

      <br><br>
    </body>
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
      proba: true,

      slides: [
        { src: '/Slike/Ametist.jpg', transform: 'translateX(0)', text: 'Ametist' },
        { src: '/Slike/ARA3.jpg', transform: 'translateX(100%)', text: 'Aragonit' },
        { src: '/Slike/Geoda_zatvorena.jpg', transform: 'translateX(100%)', text: 'Geoda' },
        { src: '/Slike/Tanzanit.jpg', transform: 'translateX(100%)', text: 'Tanzanit' },
        { src: '/Slike/Ahat_ruža.jpg', transform: 'translateX(100%)', text: 'Ahat ruža' },
        { src: '/Slike/Crni_kijanit.jpg', transform: 'translateX(100%)', text: 'Crni cijanit' },
        { src: '/Slike/Dendritski_ahat.jpg', transform: 'translateX(100%)', text: 'Dendritski ahat' }
      ],
      currentSlide: 0,
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
  mounted() {
    setInterval(() => {
      const nextSlideIndex = (this.currentSlide + 1) % this.slides.length;
      this.showSlide(nextSlideIndex);
    }, 15000);
  },
  methods: {
      showSlide(index) {
      if (index === this.currentSlide) return;

      const lastIndex = this.slides.length - 1;
      const transitioningFromLastToFirst = this.currentSlide === lastIndex && index === 0;
      let direction = 'next';

      if (!transitioningFromLastToFirst) {
        direction = index > this.currentSlide ? 'next' : 'prev';
      }

      this.slides.forEach((slide, i) => {
        if (i === index) {
          slide.transform = 'translateX(0)';
          slide.zIndex = 2;
        } else if (i === this.currentSlide) {
          slide.transform = direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)';
          slide.zIndex = 1;
        } else {
          slide.transform = 'translateX(100%)';
          slide.zIndex = 0;
        }
      });

      this.currentSlide = index;
    },









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
  },
}
</script>
<style scoped>
.OKV{
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 80vw;
}
.ba{
  width: 50vw;
}
.Desno{
    width: 50vw;
    display: flex;
    flex-direction: column;
    font-size: 1.2vw;
    justify-content: center;
    align-items: flex-end;
    color: white;
}
.NaslovR{
    font-size: 2vw;
    color: white;
    width: 100%;
    display: flex;
    padding-left: 5vw;
    justify-content: start;
    margin-bottom: 1.2vw;
}
.TekstR{
    display: flex;
    font-size: 1.2vw;
    text-align: justify;
    width: 100%;
    justify-content: end;
    align-items: center;
    color: white;
    padding-right: 2vw;
}
.Lijevo{
    width: 50vw;
    display: flex;
    flex-direction: column;
    font-size: 1.2vw;
    justify-content: center;
    align-items: flex-start;
    color: white;
}
.NaslovL{
    font-size: 2vw;
    color: white;
    width: 100%;
    display: flex;
    padding-right: 5vw;
    justify-content: end;
    padding-bottom: 1.2vw;
}
.TekstL{
    width: 50vw;
    display: flex;
    font-size: 1.2vw;
    text-align: justify;
    justify-content: start;
    align-items: center;
    color: white;
    padding-left: 2vw;
}
.Spojeno{
  display: flex;
  width: 80vw;
  justify-content: start;
}
  .BCK{
    background-color: #454545;
  }
  .OKG{
    width: 80vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
  }
  .TOP{
    padding-left: 5vw;
    width: 100%;
    font-size: 2vw;
    color: white;
  }
  .TOP2{
    width: 100%;
    margin-right: 5vw;
    font-size: 2vw;
    color: white;
    display: flex;
    justify-content: end;
  }
  .BOT{
    width: 100%;
    display: flex;
    font-size: 1.2vw;
    color: white;
    justify-content: end;
  }
  .MID{
    width: 80vw;
    font-size: 1.2vw;
    text-align: justify;
    color: white;
  }
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


    .slideshow {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.slideshow img {
  height: auto;
  position: absolute;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  object-position: center;
  transition: transform 1s ease-in-out;
}
.slide-text {
  position: absolute;
  bottom: 1vw;
  left: 1vw;
  color: black;
  font-weight: bold;
  font-size: 1vw; /* Adjust the font size as needed */
  z-index: 10; /* Ensure text appears above the image */
}
</style>