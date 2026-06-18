import { useState, useEffect } from "react";
import { User, Shield, CreditCard, Bell, Sparkles, Loader2, Check, X } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

type TabType = "PROFILE" | "SECURITY" | "PAYMENT" | "NOTIFICATIONS";

export default function SettingsTab() {
  const [activeTab, setActiveTab] = useState<TabType>("PROFILE");
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Security State
  const [resetSent, setResetSent] = useState(false);
  const [secLoading, setSecLoading] = useState(false);

  const handleForgetPassword = async () => {
    if (!user?.email) return;
    setSecLoading(true);
    try {
      await (authClient as any).forgetPassword({
        email: user.email,
        redirectTo: "/reset-password",
      });
      setResetSent(true);
    } catch(e) {
      console.error(e);
      alert("Failed to send reset email");
    }
    setSecLoading(false);
  };

  // Payment State
  const [cards, setCards] = useState<any[]>([]);
  const [cardsLoading, setCardsLoading] = useState(false);

  const [showAddCard, setShowAddCard] = useState(false);
  const [newCard, setNewCard] = useState({ number: "", expMonth: "", expYear: "", cvv: "", isDefault: false });
  const [addingCard, setAddingCard] = useState(false);

  const fetchCards = async () => {
    setCardsLoading(true);
    const res = await fetch("/api/user/cards");
    const data = await res.json();
    if (Array.isArray(data)) setCards(data);
    setCardsLoading(false);
  };

  const getCardBrand = (number: string) => {
    const cleanNum = number.replace(/\D/g, "");
    if (cleanNum.startsWith("4")) return "Visa";
    if (/^5[1-5]/.test(cleanNum) || /^2[2-7]/.test(cleanNum)) return "MasterCard";
    if (/^3[47]/.test(cleanNum)) return "Amex";
    if (/^6(?:011|5)/.test(cleanNum)) return "Discover";
    return "Card";
  };

  const handleAddCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAddingCard(true);
    
    const cleanNum = newCard.number.replace(/\D/g, "");
    if (cleanNum.length < 13) {
      alert("Please enter a valid card number");
      setAddingCard(false);
      return;
    }

    const last4 = cleanNum.slice(-4);
    const brand = getCardBrand(cleanNum);

    const res = await fetch("/api/user/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        last4,
        brand,
        expMonth: newCard.expMonth,
        expYear: newCard.expYear,
        isDefault: newCard.isDefault || cards.length === 0
      })
    });
    
    if (res.ok) {
      setShowAddCard(false);
      setNewCard({ number: "", expMonth: "", expYear: "", cvv: "", isDefault: false });
      fetchCards();
    } else {
      alert("Failed to add card");
    }
    setAddingCard(false);
  };

  const handleRemoveCard = async (id: string) => {
    await fetch(`/api/user/cards?cardId=${id}`, { method: "DELETE" });
    fetchCards();
  };

  // Notifications State
  const [prefs, setPrefs] = useState<any>(null);

  const fetchPrefs = async () => {
    const res = await fetch("/api/user/settings");
    const data = await res.json();
    if (data.userId) setPrefs(data);
  };

  const handleTogglePref = async (key: string) => {
    if (!prefs) return;
    const newPrefs = { ...prefs, [key]: !prefs[key] };
    setPrefs(newPrefs);
    await fetch("/api/user/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPrefs)
    });
  };

  useEffect(() => {
    if (activeTab === "PAYMENT") fetchCards();
    if (activeTab === "NOTIFICATIONS") fetchPrefs();
  }, [activeTab]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto pb-20">
      <div>
        <h2 className="text-2xl font-semibold mb-2" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>
          Settings
        </h2>
        <p className="text-gray-400 text-sm">Manage your account preferences and personal information.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Sidebar / Options */}
        <div className="md:col-span-1 space-y-2">
          <div className="glass p-2 rounded-2xl border border-white/10">
            <button 
              onClick={() => setActiveTab("PROFILE")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "PROFILE" ? "bg-white/10 text-white" : "hover:bg-white/5 text-gray-400 hover:text-white"}`}
            >
              <User className={`w-5 h-5 ${activeTab === "PROFILE" ? "text-gray-300" : "text-gray-500"}`} />
              <span className="font-medium text-sm flex-1 text-left">Profile</span>
            </button>
            <button 
              onClick={() => setActiveTab("SECURITY")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "SECURITY" ? "bg-white/10 text-white" : "hover:bg-white/5 text-gray-400 hover:text-white"}`}
            >
              <Shield className={`w-5 h-5 ${activeTab === "SECURITY" ? "text-gray-300" : "text-gray-500"}`} />
              <span className="font-medium text-sm flex-1 text-left">Security</span>
            </button>
            <button 
              onClick={() => setActiveTab("PAYMENT")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "PAYMENT" ? "bg-white/10 text-white" : "hover:bg-white/5 text-gray-400 hover:text-white"}`}
            >
              <CreditCard className={`w-5 h-5 ${activeTab === "PAYMENT" ? "text-gray-300" : "text-gray-500"}`} />
              <span className="font-medium text-sm flex-1 text-left">Payment Methods</span>
            </button>
            <button 
              onClick={() => setActiveTab("NOTIFICATIONS")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === "NOTIFICATIONS" ? "bg-white/10 text-white" : "hover:bg-white/5 text-gray-400 hover:text-white"}`}
            >
              <Bell className={`w-5 h-5 ${activeTab === "NOTIFICATIONS" ? "text-gray-300" : "text-gray-500"}`} />
              <span className="font-medium text-sm flex-1 text-left">Notifications</span>
            </button>
          </div>
          <div className="glass p-2 rounded-2xl border border-white/10 mt-4">
            <Link href="/onboarding" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-white/10 hover:border-white/30 transition-colors">
              <Sparkles className="w-5 h-5 text-pink-400" />
              <span className="font-medium text-sm flex-1 text-left">Taste Preferences</span>
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <div className="md:col-span-2 space-y-6">
          
          {activeTab === "PROFILE" && (
            <>
              <div className="glass p-6 rounded-2xl border border-white/10 space-y-6">
                <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-400">Full Name</label>
                    <div className="relative">
                      <input type="text" defaultValue={user?.name || "Shubham"} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-colors" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-400">Email Address</label>
                    <div className="relative">
                      <input type="email" defaultValue={user?.email || "shubham@bypass.com"} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-gray-400 outline-none cursor-not-allowed" readOnly />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Contact support to change your email address.</p>
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <button className="px-6 py-2.5 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
              <div className="glass p-6 rounded-2xl border border-white/10">
                <h3 className="text-lg font-bold text-white mb-2">Danger Zone</h3>
                <p className="text-sm text-gray-400 mb-6">Permanently delete your account and all associated data.</p>
                <button className="px-6 py-2.5 border border-red-500/50 text-red-400 font-semibold rounded-xl hover:bg-red-500/10 transition-colors">
                  Delete Account
                </button>
              </div>
            </>
          )}

          {activeTab === "SECURITY" && (
            <div className="glass p-6 rounded-2xl border border-white/10 space-y-6">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-4">Password & Security</h3>
              <div className="space-y-4">
                <p className="text-sm text-gray-400">We will send a password reset link to <span className="text-white">{user?.email}</span>.</p>
                {resetSent ? (
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3 text-green-400">
                    <Check className="w-5 h-5" />
                    <span className="text-sm">Password reset email sent! Please check your inbox (or console).</span>
                  </div>
                ) : (
                  <button 
                    onClick={handleForgetPassword}
                    disabled={secLoading}
                    className="px-6 py-2.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-colors flex items-center gap-2"
                  >
                    {secLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                    Send Reset Link
                  </button>
                )}
              </div>
            </div>
          )}

          {activeTab === "PAYMENT" && (
            <div className="glass p-6 rounded-2xl border border-white/10 space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                <h3 className="text-lg font-bold text-white">Payment Methods</h3>
                {!showAddCard && (
                  <button onClick={() => setShowAddCard(true)} className="text-sm text-glow-orange hover:text-white transition-colors font-medium">
                    + Add New Card
                  </button>
                )}
              </div>
              {showAddCard ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
                  {/* Virtual Card UI */}
                  <div className="relative w-full max-w-sm mx-auto h-52 rounded-2xl p-6 overflow-hidden flex flex-col justify-between shadow-2xl border border-white/10 group perspective-1000">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 z-0"></div>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-glow-orange/20 blur-[50px] rounded-full z-0"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-glow-orange/10 blur-[60px] rounded-full z-0"></div>
                    
                    {/* Chip & Contactless */}
                    <div className="flex justify-between items-start relative z-10">
                      <div className="w-12 h-9 rounded bg-gradient-to-br from-yellow-200 to-yellow-500 flex items-center justify-center border border-yellow-600/50 relative overflow-hidden">
                        {/* Chip details */}
                        <div className="absolute inset-0 opacity-30 flex flex-col justify-around py-1">
                          <div className="w-full h-[1px] bg-black"></div>
                          <div className="w-full h-[1px] bg-black"></div>
                          <div className="w-full h-[1px] bg-black"></div>
                        </div>
                        <div className="absolute w-[1px] h-full bg-black opacity-30 left-1/2"></div>
                        <div className="w-6 h-5 rounded-sm border border-black/30 bg-gradient-to-br from-yellow-300 to-yellow-600 z-10"></div>
                      </div>
                      <div className="text-gray-400 opacity-60">
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M8.5 14c-.3-1.4-.3-2.9 0-4.3" />
                          <path d="M11.5 16.5c-.7-2.3-.7-4.7 0-7" />
                          <path d="M14.5 19c-1.1-3.3-1.1-6.7 0-10" />
                          <path d="M17.5 21.5c-1.5-4.4-1.5-8.8 0-13" />
                        </svg>
                      </div>
                    </div>

                    {/* Card Number */}
                    <div className="relative z-10 mt-4">
                      <p className="text-white font-mono text-xl tracking-[0.2em] drop-shadow-md">
                        {newCard.number ? newCard.number.replace(/(.{4})/g, '$1 ').trim() : "•••• •••• •••• ••••"}
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-end relative z-10">
                      <div className="flex gap-4">
                        <div>
                          <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Valid Thru</p>
                          <p className="text-white font-mono text-sm tracking-wider">
                            {(newCard.expMonth || "MM")} / {(newCard.expYear || "YY")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="font-bold text-xl italic text-white pr-1">
                           {getCardBrand(newCard.number)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleAddCardSubmit} className="space-y-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium text-gray-400">Card Number</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          required
                          autoComplete="off"
                          placeholder="0000 0000 0000 0000" 
                          value={newCard.number}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '').substring(0, 16);
                            setNewCard({ ...newCard, number: val });
                          }}
                          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-colors font-mono" 
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-400">Expiry Date</label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="MM" 
                            required
                            autoComplete="off"
                            maxLength={2}
                            value={newCard.expMonth}
                            onChange={(e) => setNewCard({...newCard, expMonth: e.target.value.replace(/\D/g, '')})}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-colors text-center font-mono" 
                          />
                          <span className="text-gray-500 self-center">/</span>
                          <input 
                            type="text" 
                            placeholder="YY" 
                            required
                            autoComplete="off"
                            maxLength={2}
                            value={newCard.expYear}
                            onChange={(e) => setNewCard({...newCard, expYear: e.target.value.replace(/\D/g, '')})}
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-colors text-center font-mono" 
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-sm font-medium text-gray-400">CVV</label>
                        <input 
                          type="password" 
                          placeholder="•••" 
                          required
                          autoComplete="off"
                          maxLength={4}
                          value={newCard.cvv}
                          onChange={(e) => setNewCard({...newCard, cvv: e.target.value.replace(/\D/g, '')})}
                          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-white/30 transition-colors font-mono tracking-widest" 
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-2">
                      <input 
                        type="checkbox" 
                        id="defaultCard"
                        checked={newCard.isDefault}
                        onChange={(e) => setNewCard({...newCard, isDefault: e.target.checked})}
                        className="accent-glow-orange w-4 h-4 cursor-pointer"
                      />
                      <label htmlFor="defaultCard" className="text-sm text-gray-300 cursor-pointer select-none">Set as default payment method</label>
                    </div>
                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                      <button 
                        type="button"
                        onClick={() => {
                          setShowAddCard(false);
                          setNewCard({ number: "", expMonth: "", expYear: "", cvv: "", isDefault: false });
                        }} 
                        className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit"
                        disabled={addingCard}
                        className="px-6 py-2 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
                      >
                        {addingCard && <Loader2 className="w-4 h-4 animate-spin" />}
                        Save Card
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <>
                  {cardsLoading ? (
                    <div className="py-8 flex justify-center text-gray-500"><Loader2 className="w-6 h-6 animate-spin" /></div>
                  ) : cards.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-4">No saved cards. Add one to checkout faster.</p>
                  ) : (
                    <div className="space-y-3">
                      {cards.map(c => (
                        <div key={c.id} className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
                          <div className="flex items-center gap-4">
                            <CreditCard className="w-6 h-6 text-gray-400" />
                            <div>
                              <p className="text-white font-medium">{c.brand} ending in {c.last4} {c.isDefault && <span className="ml-2 text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300">Default</span>}</p>
                              <p className="text-xs text-gray-500">Expires {c.expMonth}/{c.expYear}</p>
                            </div>
                          </div>
                          <button onClick={() => handleRemoveCard(c.id)} className="p-2 text-gray-500 hover:text-red-400 transition-colors">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {activeTab === "NOTIFICATIONS" && (
            <div className="glass p-6 rounded-2xl border border-white/10 space-y-6">
              <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-4">Notification Preferences</h3>
              
              {!prefs ? (
                <div className="py-8 flex justify-center text-gray-500"><Loader2 className="w-6 h-6 animate-spin" /></div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Email Alerts</p>
                      <p className="text-xs text-gray-500">Receive booking confirmations and updates via email.</p>
                    </div>
                    <button onClick={() => handleTogglePref("emailAlerts")} className={`w-12 h-6 rounded-full transition-colors relative ${prefs.emailAlerts ? 'bg-glow-orange' : 'bg-white/10'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${prefs.emailAlerts ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Push Notifications</p>
                      <p className="text-xs text-gray-500">Get instantly notified about showtime changes.</p>
                    </div>
                    <button onClick={() => handleTogglePref("pushAlerts")} className={`w-12 h-6 rounded-full transition-colors relative ${prefs.pushAlerts ? 'bg-glow-orange' : 'bg-white/10'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${prefs.pushAlerts ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white font-medium">Promotional Offers</p>
                      <p className="text-xs text-gray-500">Receive exclusive discounts and promo codes.</p>
                    </div>
                    <button onClick={() => handleTogglePref("promotions")} className={`w-12 h-6 rounded-full transition-colors relative ${prefs.promotions ? 'bg-glow-orange' : 'bg-white/10'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${prefs.promotions ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
