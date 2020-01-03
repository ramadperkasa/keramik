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
      title: "Login"
    }
  },
  {
    path: "/setting/profile",
    name: "setting-profile",
    component: SettingProfile,
    meta: {
      title: "Setting Profile"
    }
  },
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard"
    }
  },
  {
    path: "/agama",
    name: "agama",
    component: Agama,
    meta: {
      title: "Master Agama"
    }
  },
  {
    path: "/bank",
    name: "bank",
    component: Bank,
    meta: {
      title: "Master Bank"
    }
  },
  {
    path: "/foto",
    name: "foto",
    component: Foto,
    meta: {
      title: "Foto"
    }
  },
  {
    path: "/hari",
    name: "hari",
    component: Hari,
    meta: {
      title: "Master Hari"
    }
  },
  {
    path: "/jenis/foto",
    name: "jenis-foto",
    component: JenisFoto,
    meta: {
      title: "Master Jenis Foto"
    }
  },
  {
    path: "/jenis/kontak",
    name: "jenis-kontak",
    component: JenisKontak,
    meta: {
      title: "Master Jenis Kontak"
    }
  },
  {
    path: "/jenis/legalitas",
    name: "jenis-legalitas",
    component: JenisLegalitas,
    meta: {
      title: "Master Jenis Legalitas"
    }
  },
  {
    path: "/jenis/medsos",
    name: "jenis-medsos",
    component: JenisMedsos,
    meta: {
      title: "Master Jenis Medsos"
    }
  },
  {
    path: "/kabupaten",
    name: "kabupaten",
    component: Kabupaten,
    meta: {
      title: "Master Kabupaten"
    }
  },
  {
    path: "/kategori/merchant",
    name: "kategori-merchant",
    component: KategoriMerchant,
    meta: {
      title: "Master Kategori Merchant"
    }
  },
  {
    path: "/kategori/merchant/detail",
    name: "kategori-merchant-detail",
    component: KategoriMerchantDetail,
    meta: {
      title: "Master Kategori Merchant Detail"
    }
  },
  {
    path: "/kecamatan",
    name: "kecamatan",
    component: Kecamatan,
    meta: {
      title: "Master Kecamatan"
    }
  },
  {
    path: "/kelurahan",
    name: "kelurahan",
    component: Kelurahan,
    meta: {
      title: "Master Kelurahan"
    }
  },
  {
    path: "/konsumen",
    name: "konsumen",
    component: Konsumen,
    meta: {
      title: "Konsumen"
    }
  },
  {
    path: "/konsumen/foto",
    name: "konsumen-foto",
    component: KonsumenFoto,
    meta: {
      title: "Foto Konsumen"
    }
  },
  {
    path: "/konsumen/medsos",
    name: "konsumen-medsos",
    component: KonsumenMedsos,
    meta: {
      title: "Media Sosial Konsumen"
    }
  },
  {
    path: "/konsumen/rekening",
    name: "konsumen-rekening",
    component: KonsumenRekening,
    meta: {
      title: "Rekening Konsumen"
    }
  },
  {
    path: "/merchant",
    name: "merchant",
    component: Merchant,
    meta: {
      title: "Merchant"
    }
  },
  {
    path: "/merchant/kontak/:id",
    name: "merchant-kontak",
    component: MerchantKontak,
    meta: {
      title: "Kontak Merchant"
    }
  },
  {
    path: "/merchant/legalitas/:id",
    name: "merchant-legalitas",
    component: MerchantLegalitas,
    meta: {
      title: "Legalitas Merchant"
    }
  },
  {
    path: "/merchant/medsos/:id",
    name: "merchant-medsos",
    component: MerchantMedsos,
    meta: {
      title: "Media Sosial Merchant"
    }
  },
  {
    path: "/merchant/operasional/:id",
    name: "merchant-operasional",
    component: MerchantOperasional,
    meta: {
      title: "Operasional Merchant"
    }
  },
  {
    path: "/merchant/produk/:id",
    name: "merchant-produk",
    component: MerchantProduk,
    meta: {
      title: "Produk Merchant"
    }
  },
  {
    path: "/merchant/produk/image/:id",
    name: "merchant-produk-image",
    component: MerchantProdukImage,
    meta: {
      title: "Produk Image Merchant"
    }
  },
  {
    path: "/merchant/produk/variant/:id",
    name: "merchant-produk-variant",
    component: MerchantProdukVariant,
    meta: {
      title: "Produk Variant Merchant"
    }
  },
  {
    path: "/merchant/rekening/:id",
    name: "merchant-rekening",
    component: MerchantRekening,
    meta: {
      title: "Rekening Merchant"
    }
  },
  {
    path: "/merchant/variant/:id",
    name: "merchant-variant",
    component: MerchantVariant,
    meta: {
      title: "Variant Merchant"
    }
  },
  {
    path: "/metode/pembayaran",
    name: "metode-pembayaran",
    component: MetodePembayaran,
    meta: {
      title: "Master Metode Pembayaran"
    }
  },
  {
    path: "/metode/pengiriman",
    name: "metode-pengiriman",
    component: MetodePengiriman,
    meta: {
      title: "Master Metode Pengiriman"
    }
  },
  {
    path: "/bank/image",
    name: "foto-system",
    component: FotoSystem,
    meta: {
      title: "Foto System"
    }
  },
  {
    path: "/mitra",
    name: "mitra",
    component: Mitra,
    meta: {
      title: "Mitra"
    }
  },
  {
    path: "/mitra/foto",
    name: "mitra-foto",
    component: MitraFoto,
    meta: {
      title: "Foto Mitra"
    }
  },
  {
    path: "/mitra/kontak",
    name: "mitra-kontak",
    component: MitraKontak,
    meta: {
      title: "Kontak Mitra"
    }
  },
  {
    path: "/mitra/legalitas",
    name: "mitra-legalitas",
    component: MitraLegalitas,
    meta: {
      title: "Legalitas Mitra"
    }
  },
  {
    path: "/mitra/medsos",
    name: "mitra-medsos",
    component: MitraMedsos,
    meta: {
      title: "Media Sosial Mitra"
    }
  },
  {
    path: "/produk/kategori",
    name: "produk-kategori",
    component: ProdukKategori,
    meta: {
      title: "Produk Kategori"
    }
  },
  {
    path: "/produk/kategori/detail/:id",
    name: "produk-kategori-detail",
    component: ProdukKategoriDetail,
    meta: {
      title: "Produk Kategori Detail"
    }
  },
  {
    path: "/produk/spesifikasi",
    name: "produk-spesifikasi",
    component: ProdukSpesifikasi,
    meta: {
      title: "Produk Spesifikasi"
    }
  },
  {
    path: "/produk/sub1/kategori",
    name: "produk-sub1-kategori",
    component: ProdukSub1Kategori,
    meta: {
      title: "Produk Sub1 Kategori"
    }
  },
  {
    path: "/produk/sub2/kategori",
    name: "produk-sub2-kategori",
    component: ProdukSub2Kategori,
    meta: {
      title: "Produk Sub2 Kategori"
    }
  },
  {
    path: "/provinsi",
    name: "provinsi",
    component: Provinsi,
    meta: {
      title: "Master Provinsi"
    }
  },
  {
    path: "/rekening",
    name: "rekening",
    component: Rekening,
    meta: {
      title: "Master Rekening"
    }
  },
  {
    path: "/merchant/pembayaran",
    name: "merchant-pembayaran",
    component: MerchantPembayaran,
    meta: {
      title: "Merchant Pembayaran"
    }
  },
  {
    path: "/order/jual",
    name: "order-jual",
    component: OrderJual,
    meta: {
      title: "Order Jual"
    }
  },
  {
    path: "/order/jual/detail",
    name: "order-jual-detail",
    component: OrderJualDetail,
    meta: {
      title: "Order Jual Detail"
    }
  },
  {
    path: "/order/jual/detail/pembarayan",
    name: "order-jual-detail-pembarayan",
    component: OrderJualDetailPembarayan,
    meta: {
      title: "Order Jual Detail Pembayaran"
    }
  },
  {
    path: "/pembayaran",
    name: "pembayaran",
    component: Pembayaran,
    meta: {
      title: "Pembayaran"
    }
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
  if (nearestWithTitle) document.title = process.env.VUE_APP_NAME + nearestWithTitle.meta.title;

  next();
});

export default router;
