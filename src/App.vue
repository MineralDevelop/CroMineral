<template>
  <div v-if="this.Zaglavlje === true" class="ZGL">
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
  
  

  <div v-if="PSEShow">
    <PSE :Zag='Zaglavlje' @update-zaglavlje="updateZaglavlje" :Mine='MineralShow' @update-min="updateMinerali" :Gale='GalerijaShow' @update-gal="updateGalerija"></PSE>
  </div>
  <div v-if="MineralShow">
    <MineraliIzbornik  :Zag='Zaglavlje' @update-zaglavlje="updateZaglavlje" :PSEe='PSEShow' @update-PSE="updatePSE" :Gale='GalerijaShow' @update-gal="updateGalerija"></MineraliIzbornik>
  </div>
  <div v-if="GalerijaShow">
    <GalerijaMinerala></GalerijaMinerala>
  </div>
  
</template>
<script>

import PSE from './components/PSE.vue'
import GalerijaMinerala from './components/GalerijaMin.vue'
import MineraliIzbornik from './components/MineraliIzb.vue'

export default {
  
  
  data(){
    return{
      PSEShow: false,
      MineralShow: false,
      GalerijaShow: false,
      Zaglavlje: true,
      PicURL: null,
    }
  },
  components: {
      PSE,
      GalerijaMinerala,
      MineraliIzbornik,
  },
  methods: {

      












      PSE() {
        this.PSEShow = !this.PSEShow;
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
      }
}
</script>
