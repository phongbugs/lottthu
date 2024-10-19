<template>
  <div v-if="isOpen" class="wallet-popup">
    <div class="wallet-list">
      <h3>Select your wallet</h3>
      <ul>
        <li
          v-for="wallet in wallets"
          :key="wallet.name"
          @click="connectWallet(wallet)"
        >
          <img :src="wallet.logo" alt="wallet.name" class="wallet-logo" />
          <span>{{ wallet.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isOpen"],
  data() {
    return {
      wallets: [
        { name: "MetaMask", logo: "/logos/wallets/metamask.svg" },
        { name: "Trust Wallet", logo: "/logos/wallets/trustwallet.png" },
        { name: "Binance Wallet", logo: "/logos/wallets/binancewallet.svg" },
        { name: "Coinbase Wallet", logo: "/logos/wallets/coinbase.svg" },
        { name: "Phantom Wallet", logo: "/logos/wallets/phantom.svg" },
        { name: "Coin98", logo: "/logos/wallets/coin98.png" },
        { name: "Math Wallet", logo: "/logos/wallets/mathwallet.png" },
      ],
    };
  },
  methods: {
    connectWallet(wallet) {
      this.$emit("connect-wallet", wallet.name);
    },
  },
};
</script>

<style scoped>
.wallet-popup {
  /* Styles cho popup */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
}

.wallet-list ul {
  list-style: none;
  padding: 0;
}

.wallet-list li {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
}

.wallet-logo {
  width: 30px;
  margin-right: 10px;
}
</style>
