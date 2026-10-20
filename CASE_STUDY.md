# Jupiter Pro Redesign: Re-Engineering Solana's Leading DEX Aggregator
**Superteam India Bounty Submission: "Redesign Your Favourite App on Solana"**  
**Designer & Engineer:** Hrishikesh Yadav (@rishiiicreates)  
**Deliverable:** Complete interactive web application + Architectural case study  
**Reward Pool:** 1,500 USDC  
**Repository:** [github.com/rishiiicreates/solana-jupiter-redesign](https://github.com/rishiiicreates/solana-jupiter-redesign)  
**Live Application:** [solana-redesign.vercel.app](https://solana-redesign.vercel.app)  
**Payout Address (EVM / Solana):** `0x3028C30B8c8985Bd54669BC313Fe7950fCeB1142`

---

## 1. Executive Summary & Context

Jupiter Exchange handles over 60% of all Solana trading volume, routing billions of dollars through automated market makers (AMMs), concentrated liquidity pools (CLMMS), and central limit order books (CLOBs).

While Jupiter v6 has achieved unrivaled liquidity aggregation, the rapid influx of retail traders and high-volatility meme tokens has exposed major user experience bottlenecks:
1. **Opaque Routing & Fear of Hidden Slippage:** Users see simple percentage numbers without visual understanding of split liquidity across Orca, Raydium, and Phoenix.
2. **Toxic MEV Exposure:** Retail traders regularly fall victim to sandwich attacks by Jito searchers because MEV protection settings are buried inside multi-level technical configuration drawers.
3. **Mobile Friction & Keyboard Clashing:** On mobile Web3 browsers (Phantom, Solflare), the swap CTA is frequently occluded by the software keyboard, resulting in misclicks and transaction abandonment.

**Jupiter Pro** reimagines the interface as a high-frequency trading cockpit: transparent routing topology, 1-click Jito Bundle MEV protection, and mobile-first ergonomics.

---

## 2. Before vs. After UX Teardown

| Feature Dimension | Current Jupiter v6 UX | Jupiter Pro Redesign UX |
| :--- | :--- | :--- |
| **MEV Protection** | Hidden inside technical drawer with confusing micro-lamport fee sliders. | Prominent 1-click toggle with 3 preset tip tiers (`Normal`, `Turbo`, `Ultra`) routing directly to Jito Block Engine. |
| **Route Visualization** | Static list of pool names with minimal depth telemetry. | Dynamic glassmorphic split visualizer showing relative allocation, pool fee tier, and total depth ($42.8M Orca, $28.4M Raydium, $12.1M Phoenix). |
| **Mobile Ergonomics** | Swap button positioned below fold; easily hidden by numeric soft keyboards. | Strict 390px iPhone viewport ergonomics; all critical touch targets anchored in the lower 45% thumb zone. |
| **Information Hierarchy** | Screen overloaded with Perps, DCA, VA, Limit, and Bridge tabs competing for attention. | Focused instant-swap interface with contextual progressive disclosure for deep metrics. |

---

## 3. Core Architecture & System Specifications

### A. Jito MEV Shield Engine
Solana's public mempool exposes unconfirmed transactions to searchers executing sandwich attacks and frontrunning. Jupiter Pro integrates Jito bundles as a top-level safety feature:
- Single-switch activation wraps transactions into private atomic bundles.
- Packets are sent directly to Jito-Solana validators rather than broadcasting over public gossip.
- Guarantees 0% sandwich attack probability.

### B. Dynamic Multi-Hop Routing Visualizer
Rather than guessing why a swap was split, users receive real-time visual feedback:
- **52% Orca Whirlpool (Concentrated 0.05%):** Lowest price impact for the initial capital slice.
- **34% Raydium CLMM v3:** Deep secondary liquidity bucket.
- **14% Phoenix Limit Orderbook:** Direct limit matching for zero-slippage tail fills.
- Calculated net execution improvement: **+0.04%** compared to single-pool execution.

### C. Visual Design System
- **Color Palette:** Midnight Obsidian base (`#07090E`), Solana Green (`#14F195`), Solana Purple (`#9945FF`), and Jupiter Orange (`#F87042`).
- **Typography:** Plus Jakarta Sans for UI hierarchy, JetBrains Mono for financial figures and transaction telemetry.
- **Surface Elevation:** Multi-layered backdrop blurs (`backdrop-blur-2xl`) with hairline 1px borders (`rgba(255, 255, 255, 0.08)`) simulating frosted glass over an organic radial gradient mesh.

---

## 4. How to Run & Verify the Prototype

```bash
# Clone the repository
git clone https://github.com/rishiiicreates/solana-jupiter-redesign.git
cd solana-jupiter-redesign

# Install dependencies
bun install   # or npm install

# Start local development server
bun run dev

# Or build for production
bun run build
bun run preview
```

The prototype includes:
- Live token switching between SOL, USDC, JUP, BONK, and RAY with live USD conversion.
- Quick percentage allocation buttons (25%, 50%, 75%, MAX).
- Interactive Jito Shield toggle with tier switching.
- Desktop vs Mobile (390px iPhone frame) viewport toggle.
- Tabbed navigation exploring the live swap, UX teardown, and case study documentation.
