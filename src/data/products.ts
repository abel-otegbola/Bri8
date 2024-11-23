export const gadgets = [
    {
      id: "0",
      title: "iPhone 15 Pro Max",
      price: "1199",
      slug: "iphone-15-pro-max",
      description: "The iPhone 15 Pro Max features a titanium design, the powerful A17 Pro chip, and a cutting-edge camera system.",
      tags: ["smartphone", "Apple", "iOS", "5G"],
      category: "smartphones",
      stocks: 150,
      images: [
        "/iphone5.png",
        "/macbook.png",
      ],
      variations: {
        colors: [
          { name: "Titanium Black", img: "/iphone5.png" },
          { name: "Titanium Blue", img: "iphone5.png" },
        ],
        size: [
          { name: "128GB", img: "" },
          { name: "256GB", img: "" },
        ],
      },
      offers: [
        { name: "Free Shipping", code: "FREESHIP" },
        { name: "10% Off for Students", code: "STUDENT10" },
      ],
      createdAt: "2024-11-14T10:00:00Z",
      updatedAt: "2024-11-14T10:00:00Z",
      rating: 4.8,
    },
    {
      id: "1",
      title: "MacBook Pro 16-inch (M2 Max)",
      price: "3499",
      slug: "macbook-pro-16-m2-max",
      description: "The MacBook Pro 16-inch with the M2 Max chip offers unparalleled performance for creative professionals.",
      tags: ["laptop", "Apple", "macOS", "Pro"],
      category: "laptops",
      stocks: 80,
      images: [
        "/macbook.png",
        "/macbook.png",
      ],
      variations: {
        colors: [
          { name: "Space Gray", img: "/macbook.png" },
          { name: "Silver", img: "/macbook.png" },
        ],
        size: [
          { name: "1TB", img: "" },
          { name: "2TB", img: "" },
        ],
      },
      offers: [
        { name: "Free AppleCare for 1 Year", code: "APPLECARE1" },
        { name: "15% Off for Educators", code: "EDU15" },
      ],
      createdAt: "2024-11-14T10:00:00Z",
      updatedAt: "2024-11-14T10:00:00Z",
      rating: 4.9,
    },  
    {
        id: "2",
        title: "Wireless Noise-Cancelling Headphones",
        price: "299.99",
        slug: "wireless-noise-cancelling-headphones",
        description: "High-quality noise-cancelling headphones with exceptional sound clarity and long battery life.",
        tags: ["audio", "wireless", "noise-cancelling", "Bluetooth"],
        category: "Audio",
        stocks: 120,
        images: [
            "/headphone1.png",
            "/headphone2.png",
            "/headphone2.png",
        ],
        variations: {
            colors: [
                { name: "Black", img: "/headphone1.png" },
                { name: "White", img: "/headphone2.png" }
            ],
            size: []
        },
        offers: [
            { name: "10% Off", code: "AUDIO10" }
        ],
        createdAt: "2024-01-15",
        updatedAt: "2024-06-10",
        rating: 4.5
    },
    {
        id: "3",
        title: "Smart Fitness Watch",
        price: "149.99",
        slug: "smart-fitness-watch",
        description: "Track your health and fitness with this all-in-one smartwatch featuring GPS, heart rate monitoring, and water resistance.",
        tags: ["wearable", "fitness", "smartwatch"],
        category: "Wearable",
        stocks: 250,
        images: [
            "/Smartwatch.png",
            "/Smartwatch-new.png"
        ],
        variations: {
            colors: [
                { name: "Black", img: "/Smartwatch.png" },
                { name: "Blue", img: "/Smartwatch-new.png" }
            ],
            size: []
        },
        offers: [
            { name: "Free Shipping", code: "FREESHIP" }
        ],
        createdAt: "2023-11-05",
        updatedAt: "2024-07-21",
        rating: 4.3
    },
    {
        id: "4",
        title: "Portable Bluetooth Speaker",
        price: "79.99",
        slug: "portable-bluetooth-speaker",
        description: "Compact and durable Bluetooth speaker with deep bass and long battery life for all your outdoor adventures.",
        tags: ["audio", "portable", "Bluetooth"],
        category: "Audio",
        stocks: 180,
        images: [
            "/speaker1.png",
            "/speaker1.png"
        ],
        variations: {
            colors: [
                { name: "Red", img: "/speaker1.png" },
                { name: "Blue", img: "/speaker1.png" }
            ],
            size: []
        },
        offers: [
            { name: "15% Off", code: "SPEAKER15" }
        ],
        createdAt: "2023-09-12",
        updatedAt: "2024-03-18",
        rating: 4.7
    },
    {
        id: "5",
        title: "4K Action Camera",
        price: "199.99",
        slug: "4k-action-camera",
        description: "Capture stunning 4K videos and photos with this waterproof, rugged action camera ideal for adventure enthusiasts.",
        tags: ["camera", "4K", "action", "waterproof"],
        category: "Cameras",
        stocks: 90,
        images: [
            "/camera1.png",
            "/camera2.png"
        ],
        variations: {
            colors: [
                { name: "Black", img: "/camera1.png" }
            ],
            size: []
        },
        offers: [
            { name: "10% Off", code: "ACTION10" }
        ],
        createdAt: "2024-02-10",
        updatedAt: "2024-08-05",
        rating: 4.6
    },
    {
        id: "6",
        title: "Wireless Charging Pad",
        price: "29.99",
        slug: "wireless-charging-pad",
        description: "Fast wireless charging pad compatible with all Qi-enabled devices for convenient charging.",
        tags: ["charging", "wireless", "Qi"],
        category: "Accessories",
        stocks: 300,
        images: [
            "/chargingpad1.png",
        ],
        variations: {
            colors: [
                { name: "Black", img: "/chargingpad1.png" }
            ],
            size: []
        },
        offers: [
            { name: "5% Off", code: "CHARGE5" }
        ],
        createdAt: "2023-08-22",
        updatedAt: "2024-06-30",
        rating: 4.2
    },
    {
        id: "7",
        title: "Smart Home Hub",
        price: "129.99",
        slug: "smart-home-hub",
        description: "Control all your smart home devices from one central hub, compatible with most smart devices and voice assistants.",
        tags: ["smart home", "automation", "hub"],
        category: "Smart Home",
        stocks: 150,
        images: [
            "/smarthub1.png",
        ],
        variations: {
            colors: [
                { name: "White", img: "/smarthub-white.jpg" },
                { name: "Gray", img: "/smarthub-gray.jpg" }
            ],
            size: []
        },
        offers: [
            { name: "20% Off", code: "SMARTHUB20" }
        ],
        createdAt: "2024-04-07",
        updatedAt: "2024-09-15",
        rating: 4.8
    }
];
