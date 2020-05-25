<template>
  <div class="pagination">
    <div class="pagination__content" v-if="totalElems > perPage">
      <button class="pagination__button-left" @click="changePage(value-1)" :disabled="value == 1">
        <img alt="Назад" v-show="value == 1" data-src="~/static/svg/pagination-right-inactive.svg" style="transform: scaleX(-1);" v-lazy-load>
        <img alt="Назад" v-show="value > 1" data-src="~/static/svg/pagination-right-inactive.svg" style="transform: scaleX(-1);" v-lazy-load>
      </button>
      <button class="pagination__button" @click="changePage(1)" :class="{ 'current': value == 1 }" :disabled="value == 1">
        <span>1</span>
      </button>
      <button class="pagination__button" v-for="(button,i) in buttons" :key="`pagination-${i}`" @click="changePage(button)" :class="{ 'three-dots': button == '. . .', 'current': button == value }" :disabled="button == '. . .' || button == value">
        <span>{{ button }}</span>
      </button>
      <button class="pagination__button" @click="changePage(lastPage)" :class="{ 'current': value == lastPage }" :disabled="value == lastPage">
        <span>{{ lastPage }}</span>
      </button>
      <button class="pagination__button-right" @click="changePage(value+1)" :disabled="value == lastPage">
        <img alt="Вперед" v-show="value == lastPage" data-src="~/static/svg/pagination-right-inactive.svg" v-lazy-load>
        <img alt="Вперед" v-show="value < lastPage" data-src="~/static/svg/pagination-right-inactive.svg" v-lazy-load>
      </button>
    </div>
    <div v-if="totalElems == 0">
      <span class="pagination__empty" v-if="emptyText">{{ $t(emptyText) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: [ 'perPage', 'totalElems', 'value', 'emptyText' ],

  watch: {
    value(n,o) {
      this.generatePagination(n);
    },

    totalElems(n,o) {
      this.generatePagination(this.value);
    }
  },

  mounted() {
    this.generatePagination(this.value);
  },

  data() {
    return {
      buttons: [] // only consists of the middle numbers and ...
    }
  },

  computed: {
    lastPage() {
      return Math.ceil(this.totalElems / this.perPage);
    }
  },

  methods: {
    init() {
      this.generatePagination(this.value);
    },

    changePage(p) {
      if (p > 0 && p < this.lastPage + 1) {
        this.$emit('input', p);
        this.$bus.$emit('pageChanged', p);
        document.querySelector('.vue-back-to-top').click();
      }
    },

    generatePagination(p) {
      this.buttons = [];
      if (this.lastPage == 2) return;

      if (p == 1) p = 2;
      else if (p == this.lastPage) p = this.lastPage - 1;

      if (p - 2 > 1)
        this.buttons.push('...');
      if (p - 1 > 1)
        this.buttons.push(p - 1);
      if (p != 1 && p != this.lastPage); // Math.ceil(totalElems / perPage) is the last page
        this.buttons.push(p);
      if (p + 1 < this.lastPage)
        this.buttons.push(p + 1);
      if (p + 2 < this.lastPage)
        this.buttons.push('...');
    }
  }
}
</script>
