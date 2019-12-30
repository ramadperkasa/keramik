const data = () => {
  return {
    search: "",
    mini: false,
    model: null,
    footer: {
      inset: false
    },
    item: 0,
    items: [
      {
        text: "Referensi",
        sub: true
      },
      {
        text: "Dashboard",
        icon: "mdi-view-dashboard",
        children: false,
        action: "/",
        sub: false
      },
      {
        text: "Kewilayahan",
        icon: "mdi-map-marker-multiple-outline",
        action: false,
        sub: false,
        children: [
          {
            text: "Provinsi",
            icon: "mdi-user",
            action: "/provinsi"
          },
          {
            text: "Kabupaten",
            icon: "mdi-user",
            action: "/kabupaten"
          },
          {
            text: "Kecamatan",
            icon: "mdi-user",
            action: "/kecamatan"
          },
          {
            text: "Kelurahan",
            icon: "mdi-user",
            action: "/kelurahan"
          }
        ]
      },
      {
        text: "Merchant",
        icon: "mdi-storefront",
        children: [
          {
            text: "List Merchant",
            action: "/merchant"
          },
          {
            text: "Kategori",
            action: "/kategori/merchant"
          }
        ],
        action: false,
        sub: false
      },
      {
        text: "Konsumen",
        icon: "mdi-account-outline",
        children: false,
        action: "/konsumen",
        sub: false
      },
      {
        text: "Agama",
        icon: "mdi-islam",
        children: false,
        action: "/agama",
        sub: false
      },
      {
        text: "Hari",
        icon: "mdi-calendar-text-outline",
        children: false,
        action: "/hari",
        sub: false
      },
      {
        text: "Bank Image",
        icon: "mdi-image-filter",
        children: false,
        action: "/bank/image",
        sub: false
      },
      {
        text: "Bank",
        icon: "mdi-bank-outline",
        children: [
          {
            text: "List Bank",
            action: "/bank"
          },
          {
            text: "Rekening",
            action: "/rekening"
          }
        ],
        action: "",
        sub: false
      },
      {
        text: "Jenis",
        icon: "mdi-arrow-decision-outline",
        children: [
          {
            text: "Kontak",
            action: "/jenis/kontak"
          },
          {
            text: "Media Sosial",
            action: "/jenis/medsos"
          },
          {
            text: "Legalistas",
            action: "/jenis/legalitas"
          }
        ],
        action: false,
        sub: false
      },
      {
        text: "Metode",
        icon: "mdi-inbox-arrow-down-outline",
        children: [
          {
            text: "Metode Pengiriman",
            action: "/metode/pengiriman"
          },
          {
            text: "Metode Pembayaran",
            action: "/metode/pembayaran"
          }
        ],
        action: false,
        sub: false
      },
      {
        text: "Kategori Produk",
        icon: "mdi-format-list-text",
        children: [
          {
            text: "Kategori",
            action: "/Produk/kategori"
          },
          {
            text: "Sub Kategori 1",
            action: "/Produk/sub1/kategori"
          },
          {
            text: "Sub Kategori 2",
            action: "/Produk/sub2/kategori"
          }
        ],
        action: "false",
        sub: false
      },
      {
        text: "Transaksi",
        sub: true
      },
      {
        text: "Order",
        icon: "mdi-cart-outline",
        children: false,
        action: "/order/jual",
        sub: false
      },
      {
        text: "Pembayaran",
        icon: "mdi-cash-register",
        children: false,
        action: "/pembayaran",
        sub: false
      }
    ],
    open: false,
    menuProfile: [
      {
        text: "Setting Profile",
        action: "/setting/profile"
      },
      {
        text: "Logout",
        action: "/login"
      }
    ]
  };
};
export { data };
