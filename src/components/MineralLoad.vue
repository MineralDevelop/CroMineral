<template>
    <div v-if="Dohvati">
    <head>
        <link rel="stylesheet" href="/bootstrap-5.3.2-dist/css/bootstrap.css">
        <link rel="stylesheet" href="/css/Podnozje.css">
        <link rel="stylesheet" href="/css/zaglavlje.css">
        <link rel="stylesheet" href="/css/Colorchart.css">
        <link rel="stylesheet" href="/css/RespoMin.css">
        <link rel="stylesheet" href="/css/NoviGumbici.css">
    </head>
      <div class="NaslovOtvaranje">{{Dohvati.Ime}}</div>
      


<!-- 4 SLIKE -->

    <div v-if="DohvatiSlike.URL1 && DohvatiSlike.URL2 && DohvatiSlike.URL3 && DohvatiSlike.URL4" class="GalSlika" style="display: flex; width: 100%; border-bottom: solid 0.15vw; pad: 0; margin: 0;">
        
      <div class="SetSlika" style="display: flex; flex-direction: column;">
          <div class="SetSlika2" style="display: flex;">
            <div class="Slikica"><img :src="DohvatiSlike.URL1" alt="" class="SSlika"><div class="UUzSliku" style="color: black;">{{DohvatiSlike.Opis1}}</div></div>
            <div class="Slikica"><img :src="DohvatiSlike.URL2" alt="" class="SSlika"><div class="UUzSliku">{{DohvatiSlike.Opis2}}</div></div>
          </div>
          <div style="display: flex;">
            <p v-if="DohvatiSlike.Nalaziste1" class="OOpisSlike">{{DohvatiSlike.Nalaziste1}}</p>
            <p v-else class="OOpisSlike">Nepoznato nalazište</p>
            <p v-if="DohvatiSlike.Nalaziste2" class="OOpisSlike">{{DohvatiSlike.Nalaziste2}}</p>
            <p v-else class="OOpisSlike">Nepoznato nalazište</p>
          </div>
        </div>
        
        <div class="SetSlika" style="display: flex; flex-direction: column;">
          <div class="SetSlika2" style="display: flex;">
            <div class="Slikica"><img :src="DohvatiSlike.URL3" alt="" class="SSlika"><div class="UUzSliku" style="color: black;">{{DohvatiSlike.Opis3}}</div></div>
            <div class="Slikica"><img :src="DohvatiSlike.URL4" alt="" class="SSlika"><div class="UUzSliku">{{DohvatiSlike.Opis4}}</div></div>  
          </div>
          <div style="display: flex;">
            <p v-if="DohvatiSlike.Nalaziste3" class="OOpisSlike">{{DohvatiSlike.Nalaziste3}}</p>
            <p v-else class="OOpisSlike">Nepoznato nalazište</p>
            <p v-if="DohvatiSlike.Nalaziste4" class="OOpisSlike">{{DohvatiSlike.Nalaziste4}}</p>
            <p v-else class="OOpisSlike">Nepoznato nalazište</p>
          </div>
        </div>
    
    </div>

<!-- 2 SLIKE -->

<div v-else-if="DohvatiSlike.URL1 && DohvatiSlike.URL2" class="GalSlika" style="display: flex; width: 100%; border-bottom: solid 0.15vw; pad: 0; margin: 0;">
        
  <div class="SetSlika" style="display: flex; flex-direction: column; width: 100%;">
    <div class="SetSlika2" style="display: flex;">
      <div style="width: 100%;" class="Slikica"><img :src="DohvatiSlike.URL1" alt="" class="SSlika"><div class="UUzSliku">{{DohvatiSlike.Opis1}}</div></div>
      <div style="width: 100%;" class="Slikica"><img :src="DohvatiSlike.URL2" alt="" class="SSlika"><div class="UUzSliku">{{DohvatiSlike.Opis2}}</div></div>
    </div>
    <div style="display: flex;">
      <p v-if="DohvatiSlike.Nalaziste1" class="OOpisSlike">{{DohvatiSlike.Nalaziste1}}</p>
      <p v-else class="OOpisSlike">Nepoznato nalazište</p>
      <p v-if="DohvatiSlike.Nalaziste2" class="OOpisSlike">{{DohvatiSlike.Nalaziste2}}</p>
      <p v-else class="OOpisSlike">Nepoznato nalazište</p>
    </div>
  </div>

</div>

<!-- 1 SLIKA -->

<div v-else class="GalSlika" style="display: flex; width: 100%; border-bottom: solid 0.15vw; pad: 0; margin: 0;">
        
    <div class="SetSlika" style="display: flex; flex-direction: column; width: 100%;">
      <div class="SetSlika2" style="display: flex;">
        <div style="width: 100%;" class="Slikica"><img :src="DohvatiSlike.URL1" alt="" class="SSlika"><div class="UUzSliku">{{DohvatiSlike.Opis1}}</div></div>
      </div>
      <div style="display: flex; width: 100%;">
        <p v-if="DohvatiSlike.Nalaziste1" class="OOpisSlike" style="width: 100%;">{{DohvatiSlike.Nalaziste1}}</p>
        <p v-else class="OOpisSlike" style="width: 100%;">Nepoznato nalazište</p>
      </div>
    </div>
  
</div>


      
      <!--<div class="TeksticVise">Više slika {{Dohvati.ImeG}} možete pronaći <a href="#">ovdje</a></div>-->
      

      

    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
        
        <div style="width: 92vw; font-size: 1.2vw; padding: 1vw; margin-top: 1vw;">
            <div v-html="Dohvati.Tekst"></div>
        </div>
        <div class="SVAsvojstva">
          <div class="DVAsvojstva">
            <div class="SETsvojstva">
              <div class="SvojstvoNaslov">Fizička svojstva</div>
              <div style="margin-top: 0.5vw; font-family: 'roboto slab'; text-size-adjust: none;">
                <div style="font-size: 1vw; font-family: 'roboto slab'; padding-right: 1vw;"><span class="FizRed">Boja:&nbsp;</span><span class="text">{{Dohvati.Boja}}</span></div>
                <div style="font-size: 1vw; font-family: 'roboto slab'; padding-right: 1vw; margin-top: 0.2vw;"><span class="FizRed">Prozirnost:&nbsp;</span><span class="text">{{Dohvati.Prozirnost}}</span></div>
                <div style="font-size: 1vw; font-family: 'roboto slab'; padding-right: 1vw; margin-top: 0.2vw;"><span class="FizRed">Sjaj:&nbsp;</span><span class="text">{{Dohvati.Sjaj}}</span></div>
                <div style="font-size: 1vw; font-family: 'roboto slab'; padding-right: 1vw; margin-top: 0.2vw;"><span class="FizRed">Ogreb:&nbsp;</span><span class="text">{{Dohvati.Ogreb}}</span></div>
                <div style="font-size: 1vw; font-family: 'roboto slab'; padding-right: 1vw; margin-top: 0.2vw;"><span class="FizRed">Tvrdoća:&nbsp;</span><span class="text">{{Dohvati.Tvrdoća}}</span></div>
                <div v-if="Dohvati.KomentarTvrdoća" style="font-size: 1vw; font-family: 'roboto slab'; padding-right: 1vw; margin-top: 0.2vw;"><span class="FizRed">Komentar:&nbsp;</span><span class="text">{{Dohvati.KomentarTvrdoća}}</span></div>
                <div style="font-size: 1vw; font-family: 'roboto slab'; padding-right: 1vw; margin-top: 0.2vw;"><span class="FizRed">Čvrstoća:&nbsp;</span><span class="text">{{Dohvati.Čvrstoća}}</span></div>
                <div style="font-size: 1vw; font-family: 'roboto slab'; padding-right: 1vw; margin-top: 0.2vw;"><span class="FizRed">Kalavost:&nbsp;</span><span class="text">{{Dohvati.Kalavost}}</span></div>
                <div style="font-size: 1vw; font-family: 'roboto slab'; padding-right: 1vw; margin-top: 0.2vw;"><span class="FizRed">Lom:&nbsp;</span><span class="text">{{Dohvati.Lom}}</span></div>
                <div style="font-size: 1vw; font-family: 'roboto slab'; padding-right: 1vw; margin-top: 0.2vw;"><span class="FizRed">Gustoća:&nbsp;</span><span class="text">{{Dohvati.Specifična}} g/cm<sup class="SupSet">3</sup></span></div>
                <div v-if="Dohvati.KomentarSpecifična" style="font-size: 1vw; font-family: 'roboto slab'; padding-right: 1vw; margin-top: 0.2vw;"><span class="FizRed">Komentar:&nbsp;</span><span class="text">{{Dohvati.KomentarSpecifična}}</span></div>
              </div>
            </div>
          <div class="SETsvojstva">
            <div class="SvojstvoNaslov">Kemijska svojstva</div>
            <div style="margin-top: 0.5vw; font-size: 1vw; font-family: 'roboto slab';">
              <div class="FormSet"><span class="FizRed">Formula:&nbsp;</span><span v-html="Dohvati.Formula"></span></div>
              <div style="font-size: 1vw; font-family: 'roboto slab'; margin-top: 0.2vw;"><span class="FizRed">Opća grupa:&nbsp;</span><span class="text">{{Dohvati.Grupa}}</span></div>
              <div style="font-size: 1vw; font-family: 'roboto slab'; margin-top: 0.2vw;"><span class="FizRed">Dodatna grupacija:&nbsp;</span><span v-if="Dohvati.Grupacija" class="text">{{Dohvati.Grupacija}}</span><span v-else class="text">-</span></div>
              <div style="font-size: 1vw; font-family: 'roboto slab'; display: flex; margin-top: 0.2vw;"><nobr class="FizRed">Udio elemenata:&nbsp;</nobr> 
                <table>
                  <tr class="Reddak" v-for="(item, index) in DohvatiDetalj" :key="index">
                    <td class="Pad">
                      <span class="text">
                        <span :class="['text', item.Ele]">{{ item.Simbol }}</span> ({{ item.Ele }})
                      </span>
                      <span class="text">{{ item.Posto }}%</span>
                    </td>
                  </tr>
                </table>
                <!--<table>
                  <tr class="Reddak"><td class="Pad"><span class="text"><span :class="['text', DohvatiDetalj.Ele1]">{{DohvatiDetalj.Simbol1}}</span> ({{DohvatiDetalj.Ele1}})</span> <span class="text">{{DohvatiDetalj.Posto1}}%</span></td></tr>
                  <tr class="Reddak"><td class="Pad"><span class="text"><span :class="['text', DohvatiDetalj.Ele2]">{{DohvatiDetalj.Simbol2}}</span> ({{DohvatiDetalj.Ele2}})</span> <span class="text">{{DohvatiDetalj.Posto2}}%</span></td></tr>
                </table>-->

                <!--<table class="Tablaaa">
                  <tr class="Redak">
                    <td class="pad"><span class="Kisik text">O</span>&nbsp;<span class="text">(Kisik)</span></td>
                    <td class="pad"><span class="textPOS">53,25%</span></td>
                  </tr>
                  <tr class="Redak">
                      <td class="pad"><span class="Silicij text">Si</span>&nbsp;<span class="text">(Silicij)</span></td>
                      <td class="pad"><span class="textPOS">46,75%</span></td>
                  </tr>
                </table> -->

              </div>
            </div>
          </div>
          </div>
          <div class="Samocentriranje">
            <div class="SETsvojstva">
              <div class="SvojstvoNaslov">Kristalografija</div>
              <div style="margin-top: 0.5vw; font-size: 1vw; font-family: 'roboto slab';  ">
                <div style="font-size: 1vw; font-family: 'roboto slab'; "><nobr class="FizRed">Kristalni sustav:&nbsp;</nobr><nobr class="text">{{Dohvati.Sustav}}</nobr></div>
                <div style="font-size: 1vw; font-family: 'roboto slab'; margin-top: 0.2vw;"><nobr class="FizRed">Klasa (H-M):&nbsp;</nobr><nobr class="text">{{Dohvati.Klasa}}</nobr></div>
                <div style="display: flex; font-size: 1vw; font-family: 'roboto slab'; margin-top: 0.2vw;"><nobr class="FizRed">Parametri ćelije:&nbsp;</nobr>
                  <table>
                  <tr class="Reddak" v-for="(item, index) in DohvatiDetalj2" :key="index">
                    <td class="Pad2 text">
                      <span v-html="item.Naziv" class="text"></span>&nbsp;=&nbsp;<span class="text">{{ item.Vrijednost }}</span>
                    </td>
                  </tr>
                </table>
                </div>
                <div style="font-size: 1vw; font-family: 'roboto slab'; margin-top: 0.2vw;"><nobr class="FizRed">Volumen ćelije:&nbsp;</nobr><nobr class="text">{{Dohvati.Volumen}} &#xc5;<sup class="SupSet">3</sup></nobr></div>
                <div v-if="Dohvati.Omjer" style="font-size: 1vw; font-family: 'roboto slab'; margin-top: 0.2vw;"><nobr class="FizRed">Omjer:&nbsp;</nobr><nobr class="text">{{Dohvati.Omjer}}</nobr></div>
                <div style="font-size: 1vw; font-family: 'roboto slab'; margin-top: 0.2vw;"><nobr class="FizRed">Broj molekula (Z):&nbsp;</nobr><nobr class="text">{{Dohvati.Z}}</nobr></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import db from "/VueProjekt/src/firebase/init.js";
import { doc, getDoc } from "/VueProjekt/node_modules/firebase/firestore/dist/firestore/index.d.ts";

export default {
    props: {
        Odabrani: {
        type: String,
        },
    },
    data() {
        return {
          Dohvati: null,
          DohvatiDetalj: [],
          DohvatiDetalj2: [],
        };
    },
    created() {
        this.getData();
        document.title = 'Mineral - ' + this.Odabrani;
    },
    methods: {
        async getData() {
        try {
            const docSnap = await getDoc(doc(db, 'Minerali', this.Odabrani));
            if (docSnap.exists()) {
            const docSnap2 = await getDoc(doc(db, 'Minerali', this.Odabrani, 'Slike', 'Slike'));
            if (docSnap2.exists()) {
                this.DohvatiSlike = docSnap2.data();
            }
            const docSnap3 = await getDoc(doc(db, 'Minerali', this.Odabrani, 'Elementi', 'Detalji'));
            if (docSnap3.exists()) {
                const detalji = docSnap3.data();
                this.DohvatiDetalj = this.transformData(detalji);
            }
            const docSnap4 = await getDoc(doc(db, 'Minerali', this.Odabrani, 'Elementi', 'DetaljiParametara'));
            if (docSnap4.exists()) {
                const detalji2 = docSnap4.data();
                this.DohvatiDetalj2 = this.transformData2(detalji2);
            }
            this.Dohvati = docSnap.data();
            }else {
            this.$emit('MineralNotFound');
            }
        }catch (error) {
            console.error('Error getting document:', error);
        }
        },
        transformData(detalji) {
              const data = [];
              for (let i = 1; i <= 12; i++) { 
                  if (detalji[`Ele${i}`] && detalji[`Simbol${i}`] && detalji[`Posto${i}`]) {
                      data.push({
                          Ele: detalji[`Ele${i}`],
                          Simbol: detalji[`Simbol${i}`],
                          Posto: detalji[`Posto${i}`]
                      });
                  }
              }
              return data;
        },
        transformData2(detalji2) {
              const data = [];
              for (let i = 1; i <= 8; i++) { 
                  if (detalji2[`Naziv${i}`] && detalji2[`Vrijednost${i}`]) {
                      data.push({
                          Naziv: detalji2[`Naziv${i}`],
                          Vrijednost: detalji2[`Vrijednost${i}`]
                      });
                  }
              }
              return data;
        },
    }
}
</script>

<style scoped>
      @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@350&display=swap');
      *{
        font-family: 'rubik';
        box-sizing: content-box;
        font-weight: normal;
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
    .Redak{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: none;
    }
    .Pad{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0;
      margin: 0;
      width: 100%;
    }
    .Pad2{
      display: flex;
      padding: 0;
      margin: 0;
      justify-content: start;
    }
    .Reddak{
      display: flex;
      padding: 0;
      margin: 0;
    }
</style>
