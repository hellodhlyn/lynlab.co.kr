<template>
  <div id="apps-crypto" class="flex justify-center items-center align-center bg-gray-100">
    <div class="max-w-lg m-4 md:m-8 p-4 md:p-8 bg-white border border-lg border-gray-300 rounded">
      <p class="pb-2 font-bold text-2xl">암호화폐 계산기</p>
      <p><a class="text-blue-600 hover:underline" target="_blank" href="https://upbit.com">업비트</a>의 현재 시세를 이용하여 암호화폐간 금액을 변환합니다.</p>

      <div class="py-4">
        <div class="flex py-4">
          <div class="h-10 w-2/3 md:w-3/4 mr-2">
            <input v-model="input.price" :class="`h-full w-full px-2 bg-gray-100 focus:bg-white border rounded ${priceIsNaN ? 'border-red-300' : 'border-gray-100 focus:border-gray-300'}`" type="text" autofocus>
          </div>
          <div class="w-1/3 md:w-1/4 relative">
            <select v-model="input.currencyFrom" class="appearance-none px-2 h-10 w-full bg-gray-100 rounded">
              <option v-for="cur in currencies" :key="cur.id">{{ cur.id }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ion-icon name="arrow-dropdown" />
            </div>
          </div>
        </div>

        <div class="w-full text-center text-xl">
          <ion-icon name="arrow-round-down" />
        </div>

        <div class="flex py-4">
          <div class="relative h-10 w-2/3 md:w-3/4 mr-2">
            <input :value="convertedPrice" class="h-full w-full px-2 bg-gray-100 focus:bg-white border border-gray-100 focus:border-gray-300 rounded" disabled>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ion-icon v-if="error.server" class="text-red-700" name="warning" />
              <ion-icon v-else-if="loading" id="loading-icon" name="sync" />
            </div>
          </div>
          <div class="w-1/3 md:w-1/4 relative">
            <select v-model="input.currencyTo" class="appearance-none px-2 h-10 w-full bg-gray-100 rounded">
              <option v-for="cur in currencies" :key="cur.id">{{ cur.id }}</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ion-icon name="arrow-dropdown" />
            </div>
          </div>
        </div>
      </div>

      <div class="text-sm text-gray-600">
        <p>본 서비스에서 제공하는 시세는 참고용으로, 통신오류・전산장애 등으로 잘못된 값이 표기될 수 있습니다. 이를 이용한 투자의 책임은 투자자 본인에게 있습니다.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

const endpoint = 'https://elysia.lynlab.co.kr';

export default {
  head() {
    return { title: '암호화폐 계산기 | LYnLab Apps' };
  },
  data() {
    return {
      currencies: [],
      loading: true,
      input: { price: '1.0', currencyFrom: null, currencyTo: null },
      error: { server: false },
    };
  },
  computed: {
    priceIsNaN() {
      return !this.validatePriceIsNumber();
    },
  },
  asyncComputed: {
    async convertedPrice() {
      const { price, currencyFrom, currencyTo } = this.input;
      if (!currencyFrom || !currencyTo || !price || !this.validatePriceIsNumber()) {
        return '';
      }
      if (currencyFrom === currencyTo) {
        return price;
      }

      this.loading = true;
      let res;
      try {
        res = await axios.get(`${endpoint}/v1/crypto/converted_price?price=${price}&currencyFrom=${currencyFrom}&currencyTo=${currencyTo}`);
      } catch {
        this.error.server = true;
      } finally {
        this.loading = false;
      }

      const parts = res.data.convertedPrice.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return parts.join('.').replace('.00000000', '');
    },
  },
  created() {
    this.loadCurrencies();
  },
  methods: {
    loadCurrencies() {
      axios.get(`${endpoint}/v1/crypto/currencies`).then((res) => {
        this.currencies = res.data.sort((a, b) => a.id > b.id);

        const base = this.currencies.find((c) => c.id === 'BTC');
        this.input.currencyFrom = base ? base.id : this.currencies[0].id;
        const fiat = this.currencies.find((c) => c.id === 'KRW');
        this.input.currencyTo = fiat ? fiat.id : this.currencies[0].id;
      }).catch(() => {
        this.error.server = true;
      });
    },
    validatePriceIsNumber() {
      return /^\d+(\.\d*)?$/.test(this.input.price);
    },
  },
};
</script>

<style lang="scss" scoped>
@-webkit-keyframes rotating {
  from {
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes rotating {
  from {
    -ms-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -webkit-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
#loading-icon {
  -webkit-animation: rotating 2s linear infinite;
  -moz-animation: rotating 2s linear infinite;
  -ms-animation: rotating 2s linear infinite;
  -o-animation: rotating 2s linear infinite;
  animation: rotating 2s linear infinite;
  -webkit-animation-direction: reverse;
  -moz-animation-direction: reverse;
  -ms-animation-direction: reverse;
  -o-animation-direction: reverse;
  animation-direction: reverse;
}
</style>
