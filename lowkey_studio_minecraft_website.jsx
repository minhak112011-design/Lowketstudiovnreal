import { useEffect, useMemo, useState } from "react";

const DISCORD_LINK = "https://discord.gg/NjfcnsdXzm";
const ADMIN_USERNAME = "lowkeyminh";
const ADMIN_PASSWORD = "Nhatminh112011@##";

const serviceZones = [
  { id: "Tất cả", title: "Tất cả", icon: "✦", desc: "Xem toàn bộ dịch vụ LOWKEY STUDIO." },
  { id: "Web", title: "Làm Web", icon: "🌐", desc: "Web giới thiệu, web shop, web server, web custom." },
  { id: "Minecraft", title: "Minecraft Config", icon: "⛏️", desc: "Plugin, anti cheat, rank, crate, economy, TPS." },
  { id: "Free", title: "Free Support", icon: "🎁", desc: "Hỗ trợ sơ sơ cho người mới mở server." },
  { id: "Combo", title: "Combo", icon: "🔥", desc: "Gói tiết kiệm config + web + Discord." },
];

const defaultProducts = [
  {
    id: "free-newbie",
    name: "Free Tối Ưu Cho Người Mới",
    price: 0,
    tag: "FREE",
    category: "Free",
    zone: "Free",
    description: "Hỗ trợ miễn phí cho người mới mở server: tư vấn plugin, check lỗi nhẹ, tối ưu sơ sơ.",
    features: ["Tư vấn plugin cần dùng", "Check console lỗi nhẹ", "Gợi ý Paper/Purpur", "Tối ưu sơ bộ", "Hỗ trợ qua Discord"],
  },
  {
    id: "plugin-basic",
    name: "Config Plugin Cơ Bản",
    price: 19000,
    tag: "GIÁ RẺ",
    category: "Plugin",
    zone: "Minecraft",
    description: "Config 1-2 plugin đơn giản cho server mới.",
    features: ["Config plugin", "Fix lỗi config", "Hướng dẫn dùng", "Giao nhanh"],
  },
  {
    id: "gui-menu",
    name: "Config Menu GUI Đẹp",
    price: 29000,
    tag: "MENU",
    category: "GUI",
    zone: "Minecraft",
    description: "Làm menu chính, menu warp, shop, rank, discord cho server.",
    features: ["DeluxeMenus", "Menu warp", "Menu shop", "Menu rank", "Icon đẹp"],
  },
  {
    id: "anticheat-lite",
    name: "Anti Cheat Lite",
    price: 39000,
    tag: "HOT",
    category: "Anti Cheat",
    zone: "Minecraft",
    description: "Config anti cheat giá mềm, giảm hack cơ bản cho server nhỏ.",
    features: ["Chống fly/speed cơ bản", "Giảm false flag", "Thông báo staff", "Tư vấn plugin anti cheat"],
  },
  {
    id: "anticheat-pro",
    name: "Anti Cheat Pro Config",
    price: 79000,
    tag: "PRO",
    category: "Anti Cheat",
    zone: "Minecraft",
    description: "Config anti cheat kỹ hơn cho server PvP, BoxPvP, Survival đông người.",
    features: ["Tối ưu check combat", "Speed/Fly/KillAura", "Log staff", "Giảm kick nhầm", "Test thực tế"],
  },
  {
    id: "luckperms-rank",
    name: "LuckPerms Rank & Permission",
    price: 35000,
    tag: "RANK",
    category: "Rank",
    zone: "Minecraft",
    description: "Setup rank, prefix, quyền VIP, quyền staff bằng LuckPerms.",
    features: ["Rank Member/VIP/Staff", "Prefix màu", "Permission chuẩn", "Group inheritance"],
  },
  {
    id: "crate-key",
    name: "Crate / Key Donate",
    price: 45000,
    tag: "CRATE",
    category: "Donate",
    zone: "Minecraft",
    description: "Tạo crate key, phần thưởng donate, hiệu ứng mở rương.",
    features: ["Crate thường", "Crate VIP", "Reward cân bằng", "Hiệu ứng", "Key donate"],
  },
  {
    id: "shop-economy",
    name: "Shop / Economy Balance",
    price: 49000,
    tag: "ECONOMY",
    category: "Economy",
    zone: "Minecraft",
    description: "Setup economy, shop mua bán, giá item hợp lý để server không bị lạm phát.",
    features: ["Vault", "ShopGUI", "Giá item", "Cân bằng tiền", "Tư vấn economy"],
  },
  {
    id: "tps-optimize",
    name: "Tối Ưu TPS / Giảm Lag",
    price: 59000,
    tag: "OPTIMIZE",
    category: "Optimize",
    zone: "Minecraft",
    description: "Tối ưu Paper/Purpur, entity, chunk, view-distance và plugin nặng.",
    features: ["paper.yml", "purpur.yml", "bukkit.yml", "spigot.yml", "Check plugin lag"],
  },
  {
    id: "discordsrv",
    name: "DiscordSRV / Bot Kết Nối",
    price: 25000,
    tag: "DISCORD",
    category: "Discord",
    zone: "Minecraft",
    description: "Kết nối chat Minecraft với Discord, log join/leave, death, console cơ bản.",
    features: ["Chat sync", "Join/leave log", "Death log", "Webhook", "Kênh staff"],
  },
  {
    id: "tab-scoreboard",
    name: "TAB / Scoreboard / Nametag",
    price: 39000,
    tag: "DISPLAY",
    category: "Display",
    zone: "Minecraft",
    description: "Làm TAB, scoreboard, nametag, prefix đẹp cho server chuyên nghiệp hơn.",
    features: ["TAB đẹp", "Scoreboard", "Nametag", "PlaceholderAPI", "Rank display"],
  },
  {
    id: "login-security",
    name: "Login Security / Auth",
    price: 29000,
    tag: "SECURITY",
    category: "Security",
    zone: "Minecraft",
    description: "Setup login/register cho server offline mode, bảo vệ tài khoản player.",
    features: ["AuthMe", "Login/Register", "Anti bot cơ bản", "Thông báo bảo mật"],
  },
  {
    id: "worldguard-claim",
    name: "WorldGuard / Claim / Protect",
    price: 39000,
    tag: "PROTECT",
    category: "Protect",
    zone: "Minecraft",
    description: "Bảo vệ spawn, region, claim đất, chống phá map và grief cơ bản.",
    features: ["WorldGuard", "Region spawn", "Claim", "Flag bảo vệ", "Chống grief"],
  },
  {
    id: "quest-battlepass",
    name: "Quest / Battle Pass Cơ Bản",
    price: 69000,
    tag: "FUN",
    category: "Gameplay",
    zone: "Minecraft",
    description: "Thêm nhiệm vụ, phần thưởng, daily quest hoặc battle pass mini để giữ player.",
    features: ["Daily quest", "Reward", "Battle pass mini", "Menu nhiệm vụ"],
  },
  {
    id: "web-basic",
    name: "Web Giới Thiệu Basic",
    price: 49000,
    tag: "WEB 49K",
    category: "Web Design",
    zone: "Web",
    description: "Web 1 trang giới thiệu studio, shop nhỏ, cá nhân hoặc server Minecraft.",
    features: ["1 trang landing", "Giao diện đẹp", "Nút Discord", "Responsive", "Màu theo yêu cầu"],
  },
  {
    id: "web-studio",
    name: "Web Studio Pro",
    price: 99000,
    tag: "WEB 99K",
    category: "Web Design",
    zone: "Web",
    description: "Web studio chuyên nghiệp hơn, có nhiều khu giới thiệu dịch vụ và bảng giá.",
    features: ["Hero đẹp", "Khu dịch vụ", "Bảng giá", "FAQ", "Liên hệ Discord"],
  },
  {
    id: "web-minecraft",
    name: "Web Minecraft Server",
    price: 129000,
    tag: "MC WEB",
    category: "Web Design",
    zone: "Web",
    description: "Web riêng cho server Minecraft: IP, luật chơi, rank, donate, event, Discord.",
    features: ["IP server", "Luật chơi", "Rank/donate", "Event", "Discord CTA"],
  },
  {
    id: "web-shop",
    name: "Web Shop Demo",
    price: 149000,
    tag: "SHOP",
    category: "Web Shop",
    zone: "Web",
    description: "Web bán dịch vụ/sản phẩm có giỏ hàng, đơn hàng, tài khoản và admin demo.",
    features: ["Shop sản phẩm", "Giỏ hàng", "Tài khoản", "Đơn hàng", "Admin demo", "Tự lưu"],
  },
  {
    id: "web-premium",
    name: "Web Premium UI",
    price: 199000,
    tag: "UI XỊN",
    category: "Web Design",
    zone: "Web",
    description: "Web giao diện xịn hơn, nhiều hiệu ứng, card đẹp, hợp làm thương hiệu.",
    features: ["UI hiện đại", "Hiệu ứng hover", "Section đẹp", "Responsive", "Trải nghiệm mượt"],
  },
  {
    id: "web-custom",
    name: "Web Custom Theo Yêu Cầu",
    price: 299000,
    tag: "CUSTOM",
    category: "Web Custom",
    zone: "Web",
    description: "Làm web theo ý tưởng riêng, giá tùy độ khó và số chức năng.",
    features: ["Thiết kế riêng", "Logic riêng", "Nhiều section", "Admin demo", "Tư vấn flow", "Có thể thương lượng"],
  },
  {
    id: "combo-small",
    name: "Combo Config Server Nhỏ",
    price: 99000,
    tag: "COMBO",
    category: "Combo",
    zone: "Combo",
    description: "Combo giá tốt cho server nhỏ muốn mở nhanh nhưng vẫn có đủ tính năng cơ bản.",
    features: ["Menu", "Rank", "Shop", "Crate", "Anti cheat Lite", "Tối ưu nhẹ"],
  },
  {
    id: "combo-premium",
    name: "Combo Premium Config",
    price: 179000,
    tag: "BEST",
    category: "Combo",
    zone: "Combo",
    description: "Gói nhiều config cho server muốn nhìn chuyên nghiệp hơn và dễ vận hành.",
    features: ["Anti Cheat Pro", "GUI đẹp", "Rank", "Crate", "Economy", "DiscordSRV", "TPS optimize"],
  },
  {
    id: "combo-web-server",
    name: "Combo Server + Web",
    price: 249000,
    tag: "COMBO WEB",
    category: "Combo",
    zone: "Combo",
    description: "Combo config server Minecraft kèm web giới thiệu hoặc web donate cơ bản.",
    features: ["Config Minecraft", "Web giới thiệu", "Discord CTA", "Bảng giá donate", "Tối ưu cơ bản"],
  },
];

const formatMoney = (amount) => {
  if (amount === 0) return "Miễn phí";
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(amount);
};

const safeLoad = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
};

const safeSave = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn("Không thể lưu dữ liệu", key);
  }
};

export default function LowkeyStudioWebsite() {
  const [page, setPage] = useState("shop");
  const [products] = useState(defaultProducts);
  const [cart, setCart] = useState(() => safeLoad("lowkey_cart_v3", []));
  const [users, setUsers] = useState(() => safeLoad("lowkey_users_v3", []));
  const [orders, setOrders] = useState(() => safeLoad("lowkey_orders_v3", []));
  const [deposits, setDeposits] = useState(() => safeLoad("lowkey_deposits_v3", []));
  const [user, setUser] = useState(() => safeLoad("lowkey_current_user_v3", null));
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ username: "", password: "" });
  const [depositAmount, setDepositAmount] = useState(50000);
  const [giveMoneyForm, setGiveMoneyForm] = useState({ username: "", amount: 50000 });
  const [message, setMessage] = useState("Dữ liệu đang tự động lưu trên trình duyệt.");
  const [search, setSearch] = useState("");
  const [zone, setZone] = useState("Tất cả");
  const [category, setCategory] = useState("Tất cả");

  useEffect(() => safeSave("lowkey_cart_v3", cart), [cart]);
  useEffect(() => safeSave("lowkey_users_v3", users), [users]);
  useEffect(() => safeSave("lowkey_orders_v3", orders), [orders]);
  useEffect(() => safeSave("lowkey_deposits_v3", deposits), [deposits]);
  useEffect(() => safeSave("lowkey_current_user_v3", user), [user]);

  const categories = ["Tất cả", ...new Set(products.map((item) => item.category))];

  const filteredProducts = products.filter((product) => {
    const text = `${product.name} ${product.description} ${product.category} ${product.zone} ${product.features.join(" ")}`.toLowerCase();
    const matchesSearch = text.includes(search.toLowerCase());
    const matchesZone = zone === "Tất cả" || product.zone === zone;
    const matchesCategory = category === "Tất cả" || product.category === category;
    return matchesSearch && matchesZone && matchesCategory;
  });

  const cartLines = useMemo(() => {
    const map = new Map();
    cart.forEach((item) => {
      if (!map.has(item.id)) map.set(item.id, { ...item, quantity: 0 });
      map.get(item.id).quantity += 1;
    });
    return Array.from(map.values());
  }, [cart]);

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0), [cart]);
  const currentUserOrders = orders.filter((order) => order.user === user?.username);
  const currentUserDeposits = deposits.filter((deposit) => deposit.user === user?.username);

  const addToCart = (product) => {
    setCart((old) => [...old, product]);
    setMessage(`Đã thêm ${product.name} vào giỏ hàng.`);
  };

  const removeOneFromCart = (productId) => {
    setCart((old) => {
      const index = old.findIndex((item) => item.id === productId);
      if (index === -1) return old;
      return old.filter((_, i) => i !== index);
    });
    setMessage("Đã giảm số lượng trong giỏ hàng.");
  };

  const removeAllFromCart = (productId) => {
    setCart((old) => old.filter((item) => item.id !== productId));
    setMessage("Đã xóa sản phẩm khỏi giỏ hàng.");
  };

  const clearCart = () => {
    setCart([]);
    setMessage("Đã làm trống giỏ hàng.");
  };

  const register = (e) => {
    e.preventDefault();
    const username = registerForm.username.trim();
    const password = registerForm.password;

    if (!username || !password) return setMessage("Vui lòng nhập đủ tên tài khoản và mật khẩu.");
    if (username === ADMIN_USERNAME || users.some((item) => item.username === username)) return setMessage("Tài khoản này đã tồn tại.");

    const newUser = { username, password, balance: 0, role: "user", createdAt: new Date().toLocaleString("vi-VN") };
    setUsers((old) => [...old, newUser]);
    setMessage("Tạo tài khoản thành công. Dữ liệu đã tự lưu.");
    setRegisterForm({ username: "", password: "" });
    setPage("login");
  };

  const login = (e) => {
    e.preventDefault();
    const username = loginForm.username.trim();
    const password = loginForm.password;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setUser({ username: ADMIN_USERNAME, role: "admin", balance: 999999999 });
      setMessage("Đăng nhập admin thành công.");
      setPage("admin");
      return;
    }

    const found = users.find((item) => item.username === username && item.password === password);
    if (!found) return setMessage("Sai tài khoản hoặc mật khẩu.");

    setUser(found);
    setMessage("Đăng nhập thành công.");
    setPage("shop");
  };

  const checkout = () => {
    if (!user) {
      setMessage("Bạn cần đăng nhập trước khi mua hàng.");
      setPage("login");
      return;
    }
    if (cart.length === 0) return setMessage("Giỏ hàng đang trống.");

    const isFreeOrder = total === 0;
    const hasEnoughBalance = (user?.balance || 0) >= total;

    const order = {
      id: `LK-${Date.now()}`,
      user: user.username,
      items: cartLines.map((item) => ({ id: item.id, name: item.name, price: item.price, quantity: item.quantity })),
      total,
      status: isFreeOrder ? "Free - chờ hỗ trợ" : hasEnoughBalance ? "Đã thanh toán - chờ làm" : "Chờ thanh toán Discord",
      note: isFreeOrder ? "Gói miễn phí cho người mới." : hasEnoughBalance ? "Đã trừ tiền từ số dư tài khoản." : "Khách cần vào Discord gửi bill cho admin duyệt.",
      createdAt: new Date().toLocaleString("vi-VN"),
    };

    if (!isFreeOrder && hasEnoughBalance && user.role !== "admin") {
      const updatedUsers = users.map((item) => item.username === user.username ? { ...item, balance: item.balance - total } : item);
      setUsers(updatedUsers);
      setUser({ ...user, balance: user.balance - total });
    }

    setOrders((old) => [order, ...old]);
    setCart([]);
    setMessage(isFreeOrder ? "Đã tạo đơn free. Vào Discord để được hỗ trợ." : hasEnoughBalance ? "Mua thành công. Web đã tự trừ tiền và lưu đơn hàng." : "Đã tạo đơn chờ thanh toán. Vào Discord ib admin để nạp tiền/xác nhận đơn.");
    setPage("orders");
  };

  const requestDeposit = () => {
    if (!user) {
      setMessage("Bạn cần đăng nhập để tạo yêu cầu nạp tiền.");
      setPage("login");
      return;
    }

    const amount = Number(depositAmount);
    if (!amount || amount < 10000) return setMessage("Số tiền nạp tối thiểu nên từ 10.000đ.");

    const deposit = { id: `NAP-${Date.now()}`, user: user.username, amount, status: "Chờ admin duyệt", createdAt: new Date().toLocaleString("vi-VN") };
    setDeposits((old) => [deposit, ...old]);
    setMessage("Đã tạo yêu cầu nạp tiền. Vào Discord gửi bill cho admin nhé.");
  };

  const approveDeposit = (depositId) => {
    const deposit = deposits.find((item) => item.id === depositId);
    if (!deposit || deposit.status === "Đã duyệt") return;

    setDeposits((old) => old.map((item) => item.id === depositId ? { ...item, status: "Đã duyệt" } : item));
    setUsers((old) => old.map((item) => item.username === deposit.user ? { ...item, balance: item.balance + deposit.amount } : item));
    if (user?.username === deposit.user) setUser((old) => ({ ...old, balance: old.balance + deposit.amount }));
    setMessage(`Đã duyệt nạp ${formatMoney(deposit.amount)} cho ${deposit.user}.`);
  };

  const markOrderDone = (orderId) => {
    setOrders((old) => old.map((order) => order.id === orderId ? { ...order, status: "Đã xử lý" } : order));
    setMessage("Đã cập nhật đơn hàng thành Đã xử lý.");
  };

  const markOrderPaid = (orderId) => {
    setOrders((old) => old.map((order) => order.id === orderId ? { ...order, status: "Đã thanh toán - chờ làm" } : order));
    setMessage("Đã đánh dấu đơn là đã thanh toán.");
  };

  const giveMoneyToUser = () => {
    if (user?.role !== "admin") return;
    const amount = Number(giveMoneyForm.amount);
    const targetUsername = giveMoneyForm.username.trim();

    if (!targetUsername || !amount || amount <= 0) return setMessage("Nhập đúng tên tài khoản và số tiền cần cộng.");
    if (!users.some((item) => item.username === targetUsername)) return setMessage("Không tìm thấy tài khoản này.");

    setUsers((old) => old.map((item) => item.username === targetUsername ? { ...item, balance: item.balance + amount } : item));
    setDeposits((old) => [{ id: `GIVE-${Date.now()}`, user: targetUsername, amount, status: "Admin cộng thủ công", createdAt: new Date().toLocaleString("vi-VN") }, ...old]);
    setMessage(`Đã cộng ${formatMoney(amount)} vào tài khoản ${targetUsername}.`);
    setGiveMoneyForm({ username: "", amount: 50000 });
  };

  const clearDemoData = () => {
    if (user?.role !== "admin") return;
    setCart([]);
    setOrders([]);
    setDeposits([]);
    setMessage("Admin đã xóa giỏ hàng, đơn hàng và yêu cầu nạp demo.");
  };

  const navClass = (target) => `px-4 py-2 rounded-xl transition ${page === target ? "bg-purple-600 text-white" : "hover:bg-zinc-900 text-zinc-300"}`;

  const productCard = (product) => (
    <div key={product.id} className="group rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900 to-zinc-950 p-7 flex flex-col hover:border-purple-500/70 hover:-translate-y-1 transition shadow-xl shadow-black/30">
      <div className="flex items-center justify-between mb-4 gap-3">
        <span className="text-xs font-black px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">{product.tag}</span>
        <span className="text-xl font-black text-cyan-300">{formatMoney(product.price)}</span>
      </div>
      <h3 className="text-2xl font-black mb-3">{product.name}</h3>
      <p className="text-zinc-400 mb-5 leading-relaxed">{product.description}</p>
      <ul className="space-y-2 text-zinc-300 mb-7 flex-1">
        {product.features.map((feature) => <li key={feature}>✔ {feature}</li>)}
      </ul>
      <button onClick={() => addToCart(product)} className="w-full py-3 rounded-2xl bg-purple-500 hover:bg-purple-400 transition font-bold shadow-lg shadow-purple-500/20">Thêm vào giỏ</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <button onClick={() => setPage("shop")} className="text-2xl font-black tracking-tight">LOWKEY<span className="text-purple-400">STUDIO</span></button>
          <nav className="flex flex-wrap gap-2 text-sm">
            <button onClick={() => setPage("shop")} className={navClass("shop")}>Shop</button>
            <button onClick={() => setPage("cart")} className={navClass("cart")}>Giỏ hàng ({cart.length})</button>
            <button onClick={() => setPage("deposit")} className={navClass("deposit")}>Nạp tiền</button>
            <button onClick={() => setPage("orders")} className={navClass("orders")}>Đơn của tôi</button>
            {user?.role === "admin" && <button onClick={() => setPage("admin")} className={navClass("admin")}>Admin</button>}
            {user ? <button onClick={() => { setUser(null); setPage("shop"); setMessage("Đã đăng xuất."); }} className="px-4 py-2 rounded-xl border border-zinc-700 hover:border-red-400 text-zinc-300">Đăng xuất</button> : <button onClick={() => setPage("login")} className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800">Đăng nhập</button>}
          </nav>
        </div>
      </header>

      {message && <div className="max-w-7xl mx-auto px-6 pt-6"><div className="rounded-2xl border border-purple-500/40 bg-gradient-to-r from-purple-500/15 to-cyan-500/10 p-4 text-purple-100 flex items-center gap-3"><span className="h-3 w-3 rounded-full bg-green-400 shadow-lg shadow-green-400/40" /><span>{message}</span></div></div>}

      {page === "shop" && (
        <main>
          <section className="relative overflow-hidden border-b border-zinc-800">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-cyan-900/20" />
            <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="uppercase tracking-[0.35em] text-zinc-400 text-sm mb-4">Minecraft Config • Web Design • Discord Services</p>
                <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">LOWKEY<span className="block text-purple-400">SERVICE SHOP</span></h1>
                <p className="text-zinc-300 text-lg leading-relaxed mb-8 max-w-2xl">Nhận config plugin Minecraft, anti cheat, tối ưu TPS và làm web theo ngân sách. Có gói free cho người mới, gói web 49k đến 299k+, giỏ hàng tự lưu và thanh toán bằng số dư.</p>
                <div className="flex flex-wrap gap-4">
                  <a href={DISCORD_LINK} target="_blank" className="px-6 py-3 rounded-2xl bg-purple-500 hover:bg-purple-400 transition font-bold shadow-lg shadow-purple-500/30">Vào Discord</a>
                  <button onClick={() => { setZone("Web"); setCategory("Tất cả"); }} className="px-6 py-3 rounded-2xl border border-cyan-500/50 text-cyan-300 hover:border-cyan-300 transition">Xem gói web</button>
                  <button onClick={() => setPage("cart")} className="px-6 py-3 rounded-2xl border border-zinc-700 hover:border-zinc-500 transition">Xem giỏ hàng</button>
                </div>
              </div>
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-8 shadow-2xl">
                <h2 className="text-3xl font-black mb-4">Tổng quan tài khoản</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5"><p className="text-zinc-500 text-sm">Tài khoản</p><p className="text-xl font-black text-cyan-300 truncate">{user ? user.username : "Chưa login"}</p></div>
                  <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5"><p className="text-zinc-500 text-sm">Số dư</p><p className="text-xl font-black text-purple-300">{formatMoney(user?.balance || 0)}</p></div>
                  <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5"><p className="text-zinc-500 text-sm">Giỏ hàng</p><p className="text-xl font-black">{cart.length} món</p></div>
                  <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5"><p className="text-zinc-500 text-sm">Tổng tạm</p><p className="text-xl font-black text-cyan-300">{formatMoney(total)}</p></div>
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-6 py-20">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
              {serviceZones.map((item) => (
                <button key={item.id} onClick={() => { setZone(item.id); setCategory("Tất cả"); }} className={`text-left rounded-3xl border p-5 transition hover:-translate-y-1 ${zone === item.id ? "border-purple-500 bg-purple-500/15" : "border-zinc-800 bg-zinc-950 hover:border-purple-500/50"}`}>
                  <p className="text-3xl mb-3">{item.icon}</p>
                  <h3 className="text-xl font-black mb-2">{item.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>

            <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 p-8 mb-12">
              <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-center">
                <div>
                  <p className="uppercase tracking-[0.3em] text-cyan-300 text-sm mb-3">Khu làm web mới</p>
                  <h2 className="text-4xl font-black mb-4">Giá web tùy theo tiền khách</h2>
                  <p className="text-zinc-300 leading-relaxed">Khách ít tiền chọn web basic 49k. Muốn shop, admin demo, giỏ hàng, giao diện xịn thì chọn gói cao hơn. Gói custom báo giá qua Discord.</p>
                </div>
                <div className="rounded-2xl border border-zinc-800 bg-black/60 p-5">
                  <p className="text-zinc-400">Bảng giá nhanh</p>
                  <p className="text-3xl font-black text-cyan-300 mt-2">49k → 299k+</p>
                  <p className="text-zinc-500 mt-2">Basic • Studio • Shop • Minecraft Web • Custom</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-4xl font-black mb-3">Dịch vụ</h2>
                <p className="text-zinc-400">Đang xem: {zone} • lọc: {category}</p>
              </div>
              <button onClick={() => setPage("cart")} className="px-5 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-purple-500">Xem giỏ hàng</button>
            </div>

            <div className="grid md:grid-cols-[1fr_220px] gap-4 mb-8">
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm: web, anti cheat, menu, rank, crate, optimize..." className="px-4 py-3 rounded-2xl bg-zinc-950 border border-zinc-800 outline-none focus:border-purple-500" />
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="px-4 py-3 rounded-2xl bg-zinc-950 border border-zinc-800 outline-none focus:border-purple-500">
                {categories.map((item) => <option key={item}>{item}</option>)}
              </select>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(productCard)}
            </div>
          </section>
        </main>
      )}

      {page === "cart" && (
        <main className="max-w-5xl mx-auto px-6 py-20">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8"><h1 className="text-4xl font-black">Giỏ hàng</h1>{cart.length > 0 && <button onClick={clearCart} className="px-4 py-2 rounded-xl border border-red-500/40 text-red-300">Xóa hết</button>}</div>
          {cartLines.length === 0 ? <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8 text-zinc-400">Giỏ hàng đang trống. Bấm Shop để thêm dịch vụ.</div> : <div className="space-y-4">{cartLines.map((item) => <div key={item.id} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 flex flex-wrap items-center justify-between gap-4"><div><h3 className="font-bold text-lg">{item.name}</h3><p className="text-zinc-400">{formatMoney(item.price)} × {item.quantity}</p><p className="text-cyan-300 font-bold">Tạm tính: {formatMoney(item.price * item.quantity)}</p></div><div className="flex gap-2"><button onClick={() => removeOneFromCart(item.id)} className="px-4 py-2 rounded-xl border border-zinc-700">-1</button><button onClick={() => addToCart(item)} className="px-4 py-2 rounded-xl border border-zinc-700">+1</button><button onClick={() => removeAllFromCart(item.id)} className="px-4 py-2 rounded-xl border border-red-500/40 text-red-300">Xóa</button></div></div>)}<div className="rounded-3xl border border-purple-500/40 bg-purple-500/10 p-6 flex flex-wrap items-center justify-between gap-4"><div><p className="text-2xl font-black">Tổng: {formatMoney(total)}</p><p className="text-zinc-400">Nếu số dư đủ, web tự trừ tiền. Nếu chưa đủ, đơn sẽ chờ thanh toán qua Discord.</p></div><button onClick={checkout} className="px-6 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-black shadow-lg shadow-cyan-500/20">{user && total > 0 && (user.balance || 0) >= total ? "Thanh toán bằng số dư" : "Tạo đơn mua"}</button></div></div>}
        </main>
      )}

      {page === "login" && <main className="max-w-md mx-auto px-6 py-20"><h1 className="text-4xl font-black mb-8">Đăng nhập</h1><form onSubmit={login} className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7 space-y-4"><input value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} placeholder="Tên tài khoản" className="w-full px-4 py-3 rounded-2xl bg-black border border-zinc-700 outline-none focus:border-purple-500" /><input value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} placeholder="Mật khẩu" type="password" className="w-full px-4 py-3 rounded-2xl bg-black border border-zinc-700 outline-none focus:border-purple-500" /><button className="w-full py-3 rounded-2xl bg-purple-500 hover:bg-purple-400 transition font-bold">Đăng nhập</button><button type="button" onClick={() => setPage("register")} className="w-full py-3 rounded-2xl border border-zinc-700">Chưa có tài khoản? Tạo ngay</button></form></main>}

      {page === "register" && <main className="max-w-md mx-auto px-6 py-20"><h1 className="text-4xl font-black mb-8">Tạo tài khoản</h1><form onSubmit={register} className="rounded-3xl border border-zinc-800 bg-zinc-900 p-7 space-y-4"><input value={registerForm.username} onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })} placeholder="Tên tài khoản" className="w-full px-4 py-3 rounded-2xl bg-black border border-zinc-700 outline-none focus:border-purple-500" /><input value={registerForm.password} onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })} placeholder="Mật khẩu" type="password" className="w-full px-4 py-3 rounded-2xl bg-black border border-zinc-700 outline-none focus:border-purple-500" /><button className="w-full py-3 rounded-2xl bg-cyan-500 text-black hover:bg-cyan-400 transition font-black">Tạo tài khoản</button></form></main>}

      {page === "deposit" && <main className="max-w-4xl mx-auto px-6 py-20 text-center"><div className="rounded-3xl border border-cyan-500/30 bg-cyan-500/10 p-10"><h1 className="text-4xl font-black mb-5">Nạp tiền / Thanh toán</h1><p className="text-zinc-300 text-lg mb-8">Tạo yêu cầu nạp tiền trên web, sau đó vào Discord gửi bill cho admin duyệt hoặc admin cộng tiền thủ công.</p><div className="max-w-md mx-auto grid gap-4 mb-8"><input type="number" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} className="px-4 py-3 rounded-2xl bg-black border border-zinc-700 outline-none focus:border-cyan-500" /><button onClick={requestDeposit} className="px-8 py-4 rounded-2xl bg-cyan-500 text-black font-black text-lg hover:bg-cyan-400">Tạo yêu cầu nạp</button></div><a href={DISCORD_LINK} target="_blank" className="inline-block px-8 py-4 rounded-2xl bg-purple-500 font-black text-lg hover:bg-purple-400">IB DISCORD</a></div></main>}

      {page === "orders" && <main className="max-w-6xl mx-auto px-6 py-20"><h1 className="text-4xl font-black mb-8">Đơn của tôi</h1>{!user ? <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">Bạn cần đăng nhập để xem đơn.</div> : <div className="grid lg:grid-cols-2 gap-6"><div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"><h2 className="text-2xl font-black mb-4">Đơn hàng</h2><div className="space-y-3">{currentUserOrders.length === 0 && <p className="text-zinc-400">Chưa có đơn hàng.</p>}{currentUserOrders.map((order) => <div key={order.id} className="rounded-2xl bg-black border border-zinc-800 p-4"><p className="font-bold">{order.id}</p><p className="text-zinc-400">{order.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}</p><p className="text-cyan-300 font-bold">{formatMoney(order.total)}</p><p className="text-yellow-300">{order.status}</p><p className="text-zinc-500 text-sm">{order.createdAt}</p></div>)}</div></div><div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"><h2 className="text-2xl font-black mb-4">Lịch sử nạp</h2><div className="space-y-3">{currentUserDeposits.length === 0 && <p className="text-zinc-400">Chưa có yêu cầu nạp.</p>}{currentUserDeposits.map((deposit) => <div key={deposit.id} className="rounded-2xl bg-black border border-zinc-800 p-4"><p className="font-bold">{deposit.id}</p><p className="text-cyan-300 font-bold">{formatMoney(deposit.amount)}</p><p className="text-yellow-300">{deposit.status}</p></div>)}</div></div></div>}</main>}

      {page === "admin" && <main className="max-w-7xl mx-auto px-6 py-20">{user?.role !== "admin" ? <div className="rounded-3xl border border-red-500/40 bg-red-500/10 p-8 text-red-200">Bạn cần đăng nhập admin.</div> : <div><div className="flex flex-wrap items-center justify-between gap-4 mb-8"><h1 className="text-4xl font-black">Admin Panel</h1><button onClick={clearDemoData} className="px-5 py-3 rounded-2xl border border-red-500/40 text-red-300">Xóa đơn/nạp demo</button></div><div className="grid md:grid-cols-4 gap-6 mb-10"><div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"><p className="text-zinc-500">Tổng user</p><p className="text-3xl font-black">{users.length}</p></div><div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"><p className="text-zinc-500">Tổng đơn</p><p className="text-3xl font-black">{orders.length}</p></div><div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"><p className="text-zinc-500">Yêu cầu nạp</p><p className="text-3xl font-black">{deposits.length}</p></div><div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"><p className="text-zinc-500">Tổng đơn</p><p className="text-3xl font-black text-cyan-300">{formatMoney(orders.reduce((sum, order) => sum + order.total, 0))}</p></div></div><div className="rounded-3xl border border-purple-500/40 bg-purple-500/10 p-6 mb-6"><h2 className="text-2xl font-black mb-4">Give tiền vào tài khoản</h2><p className="text-zinc-300 mb-5">Khi khách chuyển khoản/ib Discord rồi, nhập tên acc và số tiền để cộng thẳng vào số dư.</p><div className="grid md:grid-cols-[1fr_200px_160px] gap-4"><input value={giveMoneyForm.username} onChange={(e) => setGiveMoneyForm({ ...giveMoneyForm, username: e.target.value })} placeholder="Tên tài khoản khách" className="px-4 py-3 rounded-2xl bg-black border border-zinc-700 outline-none focus:border-purple-500" /><input type="number" value={giveMoneyForm.amount} onChange={(e) => setGiveMoneyForm({ ...giveMoneyForm, amount: e.target.value })} placeholder="Số tiền" className="px-4 py-3 rounded-2xl bg-black border border-zinc-700 outline-none focus:border-purple-500" /><button onClick={giveMoneyToUser} className="px-5 py-3 rounded-2xl bg-purple-500 hover:bg-purple-400 font-black">Cộng tiền</button></div></div><div className="grid xl:grid-cols-2 gap-6"><div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 overflow-x-auto"><h2 className="text-2xl font-black mb-5">Đơn hàng</h2><table className="w-full text-left text-sm"><thead className="text-zinc-400"><tr><th className="py-3">User</th><th>Dịch vụ</th><th>Tổng</th><th>Trạng thái</th><th></th></tr></thead><tbody>{orders.map((order) => <tr key={order.id} className="border-t border-zinc-800 align-top"><td className="py-4">{order.user}</td><td>{order.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}</td><td>{formatMoney(order.total)}</td><td className="text-yellow-300">{order.status}</td><td className="space-y-2"><button onClick={() => markOrderPaid(order.id)} className="px-3 py-2 rounded-xl bg-cyan-500 text-black font-bold block">Paid</button><button onClick={() => markOrderDone(order.id)} className="px-3 py-2 rounded-xl bg-purple-600 block">Xong</button></td></tr>)}</tbody></table></div><div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 overflow-x-auto"><h2 className="text-2xl font-black mb-5">Duyệt nạp tiền</h2><table className="w-full text-left text-sm"><thead className="text-zinc-400"><tr><th className="py-3">User</th><th>Số tiền</th><th>Trạng thái</th><th></th></tr></thead><tbody>{deposits.map((deposit) => <tr key={deposit.id} className="border-t border-zinc-800"><td className="py-4">{deposit.user}</td><td>{formatMoney(deposit.amount)}</td><td className="text-yellow-300">{deposit.status}</td><td><button onClick={() => approveDeposit(deposit.id)} className="px-3 py-2 rounded-xl bg-cyan-500 text-black font-bold">Duyệt</button></td></tr>)}</tbody></table></div></div></div>}</main>}

      <footer className="border-t border-zinc-800 py-10 text-center text-zinc-500 text-sm"><p>© 2026 LOWKEY STUDIO — Minecraft Config & Web Design. Thanh toán và hỗ trợ qua Discord.</p></footer>
    </div>
  );
}
