import Vue from "vue";
import VueRouter from "vue-router";

import SettingProfile from "../user/SettingProfile.vue";
import Login from "../layout/Login.vue";
import Dashboard from "../layout/Dashboard.vue";
import Agama from "../referensi/Agama.vue";
import Bank from "../referensi/Bank.vue";
import Foto from "../referensi/Foto.vue";
import Hari from "../referensi/Hari.vue";
import JenisFoto from "../referensi/JenisFoto.vue";
import JenisKontak from "../referensi/JenisKontak.vue";
import JenisLegalitas from "../referensi/JenisLegalitas.vue";
import JenisMedsos from "../referensi/JenisMedsos.vue";
import Kabupaten from "../referensi/Kabupaten.vue";
import KategoriMerchant from "../referensi/KategoriMerchant.vue";
import KategoriMerchantDetail from "../referensi/KategoriMerchantDetail.vue";
import Kecamatan from "../referensi/Kecamatan.vue";
import Kelurahan from "../referensi/Kelurahan.vue";
import Konsumen from "../referensi/Konsumen.vue";
import KonsumenFoto from "../referensi/KonsumenFoto.vue";
import KonsumenMedsos from "../referensi/KonsumenMedsos.vue";
import KonsumenRekening from "../referensi/KonsumenRekening.vue";
import Merchant from "../referensi/Merchant.vue";
import MerchantKontak from "../referensi/MerchantKontak.vue";
import MerchantLegalitas from "../referensi/MerchantLegalitas.vue";
import MerchantMedsos from "../referensi/MerchantMedsos.vue";
import MerchantOperasional from "../referensi/MerchantOperasional.vue";
import MerchantProduk from "../referensi/MerchantProduk.vue";
import MerchantProdukImage from "../referensi/MerchantProdukImage.vue";
import MerchantProdukVariant from "../referensi/MerchantProdukVariant.vue";
import MerchantRekening from "../referensi/MerchantRekening.vue";
import MerchantVariant from "../referensi/MerchantVariant.vue";
import MetodePembayaran from "../referensi/MetodePembayaran.vue";
import MetodePengiriman from "../referensi/MetodePengiriman.vue";
import Mitra from "../referensi/Mitra.vue";
import MitraFoto from "../referensi/MitraFoto.vue";
import MitraKontak from "../referensi/MitraKontak.vue";
import MitraLegalitas from "../referensi/MitraLegalitas.vue";
import MitraMedsos from "../referensi/MitraMedsos.vue";
import ProdukKategori from "../referensi/ProdukKategori.vue";
import ProdukKategoriDetail from "../referensi/ProdukKategoriDetail.vue";
import ProdukSpesifikasi from "../referensi/ProdukSpesifikasi.vue";
import ProdukSub1Kategori from "../referensi/ProdukSub1Kategori.vue";
import ProdukSub2Kategori from "../referensi/ProdukSub2Kategori.vue";
import Provinsi from "../referensi/Provinsi.vue";
import FotoSystem from "../referensi/FotoSystem.vue";
import Rekening from "../referensi/Rekening.vue";
import MerchantPembayaran from "../transaksi/MerchantPembayaran.vue";
import OrderJual from "../transaksi/OrderJual.vue";
import OrderJualDetail from "../transaksi/OrderJualDetail.vue";
import OrderJualDetailPembarayan from "../transaksi/OrderJualDetailPembarayan.vue";
import Pembayaran from "../transaksi/Pembayaran.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: process.env.VUE_APP_NAME + 'Login'
    }
  },
  {
    path: "/setting/profile",
    name: "setting-profile",
    component: SettingProfile
  },
  {
    path: "/",
    name: "dashboard",
    component: Dashboard
  },
  {
    path: "/agama",
    name: "agama",
    component: Agama
  },
  {
    path: "/bank",
    name: "bank",
    component: Bank
  },
  {
    path: "/foto",
    name: "foto",
    component: Foto
  },
  {
    path: "/hari",
    name: "hari",
    component: Hari
  },
  {
    path: "/jenis/foto",
    name: "jenis-foto",
    component: JenisFoto
  },
  {
    path: "/jenis/kontak",
    name: "jenis-kontak",
    component: JenisKontak
  },
  {
    path: "/jenis/legalitas",
    name: "jenis-legalitas",
    component: JenisLegalitas
  },
  {
    path: "/jenis/medsos",
    name: "jenis-medsos",
    component: JenisMedsos
  },
  {
    path: "/kabupaten",
    name: "kabupaten",
    component: Kabupaten
  },
  {
    path: "/kategori/merchant",
    name: "kategori-merchant",
    component: KategoriMerchant
  },
  {
    path: "/kategori/merchant/detail",
    name: "kategori-merchant-detail",
    component: KategoriMerchantDetail
  },
  {
    path: "/kecamatan",
    name: "kecamatan",
    component: Kecamatan
  },
  {
    path: "/kelurahan",
    name: "kelurahan",
    component: Kelurahan
  },
  {
    path: "/konsumen",
    name: "konsumen",
    component: Konsumen
  },
  {
    path: "/konsumen/foto",
    name: "konsumen-foto",
    component: KonsumenFoto
  },
  {
    path: "/konsumen/medsos",
    name: "konsumen-medsos",
    component: KonsumenMedsos
  },
  {
    path: "/konsumen/rekening",
    name: "konsumen-rekening",
    component: KonsumenRekening
  },
  {
    path: "/merchant",
    name: "merchant",
    component: Merchant
  },
  {
    path: "/merchant/kontak/:id",
    name: "merchant-kontak",
    component: MerchantKontak
  },
  {
    path: "/merchant/legalitas/:id",
    name: "merchant-legalitas",
    component: MerchantLegalitas
  },
  {
    path: "/merchant/medsos/:id",
    name: "merchant-medsos",
    component: MerchantMedsos
  },
  {
    path: "/merchant/operasional/:id",
    name: "merchant-operasional",
    component: MerchantOperasional
  },
  {
    path: "/merchant/produk/:id",
    name: "merchant-produk",
    component: MerchantProduk
  },
  {
    path: "/merchant/produk/image/:id",
    name: "merchant-produk-image",
    component: MerchantProdukImage
  },
  {
    path: "/merchant/produk/variant/:id",
    name: "merchant-produk-variant",
    component: MerchantProdukVariant
  },
  {
    path: "/merchant/rekening/:id",
    name: "merchant-rekening",
    component: MerchantRekening
  },
  {
    path: "/merchant/variant/:id",
    name: "merchant-variant",
    component: MerchantVariant
  },
  {
    path: "/metode/pembayaran",
    name: "metode-pembayaran",
    component: MetodePembayaran
  },
  {
    path: "/metode/pengiriman",
    name: "metode-pengiriman",
    component: MetodePengiriman
  },
  {
    path: "/bank/image",
    name: "foto-system",
    component: FotoSystem
  },
  {
    path: "/mitra",
    name: "mitra",
    component: Mitra
  },
  {
    path: "/mitra/foto",
    name: "mitra-foto",
    component: MitraFoto
  },
  {
    path: "/mitra/kontak",
    name: "mitra-kontak",
    component: MitraKontak
  },
  {
    path: "/mitra/legalitas",
    name: "mitra-legalitas",
    component: MitraLegalitas
  },
  {
    path: "/mitra/medsos",
    name: "mitra-medsos",
    component: MitraMedsos
  },
  {
    path: "/produk/kategori",
    name: "produk-kategori",
    component: ProdukKategori
  },
  {
    path: "/produk/kategori/detail",
    name: "produk-kategori-detail",
    component: ProdukKategoriDetail
  },
  {
    path: "/produk/spesifikasi",
    name: "produk-spesifikasi",
    component: ProdukSpesifikasi
  },
  {
    path: "/produk/sub1/kategori",
    name: "produk-sub1-kategori",
    component: ProdukSub1Kategori
  },
  {
    path: "/produk/sub2/kategori",
    name: "produk-sub2-kategori",
    component: ProdukSub2Kategori
  },
  {
    path: "/provinsi",
    name: "provinsi",
    component: Provinsi
  },
  {
    path: "/rekening",
    name: "rekening",
    component: Rekening
  },
  {
    path: "/merchant/pembayaran",
    name: "merchant-pembayaran",
    component: MerchantPembayaran
  },
  {
    path: "/order/jual",
    name: "order-jual",
    component: OrderJual
  },
  {
    path: "/order/jual/detail",
    name: "order-jual-detail",
    component: OrderJualDetail
  },
  {
    path: "/order/jual/detail/pembarayan",
    name: "order-jual-detail-pembarayan",
    component: OrderJualDetailPembarayan
  },
  {
    path: "/pembayaran",
    name: "pembayaran",
    component: Pembayaran
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});


router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title);


  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;

  next();
})


export default router;
