<template>
  <div class="accordion" id="accordionExample">
    <div class="accordion-item">
      <h2 class="accordion-header" id="headingOne">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseOne"
          aria-expanded="true"
          aria-controls="collapseOne"
        >
          Cost Detail
        </button>
      </h2>
      <div
        id="collapseOne"
        class="accordion-collapse collapse show"
        aria-labelledby="headingOne"
        data-bs-parent="#accordionExample"
      >
        <div class="accordion-body">
          <table class="table">
            <thead class="table-light text-muted">
              <tr>
                <th width="12%" scope="col">Description</th>
                <th width="8%" scope="col">Qty</th>
                <th width="8%" scope="col">UOM</th>
                <th width="8%" scope="col">Unit Price</th>
                <th scope="col">Discount (%)</th>
                <th scope="col">VAT (%)</th>
                <td scope="col"></td>
                <th width="8%" scope="col">Currency</th>
                <th width="8%" scope="col">VAT Amount</th>
                <th width="7%" scope="col">Sub Total</th>
                <th width="6%" scope="col">Total</th>
                <th width="12%" scope="col">Charge To</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(costs, index) in params.Cost" :key="index">
                <td>
                  <AtomInput
                    class="form-control form-control-sm"
                    type="text"
                    v-model="costs.Description"
                    placeholder="Description"
                  />
                </td>
                <td>
                  <AtomInput
                    class="form-control form-control-sm"
                    @change="ChangeTotal(index)"
                    type="number"
                    v-model="costs.Qty"
                    placeholder="Qty"
                    min="1"
                  />
                </td>
                <td>
                  <select class="form-select form-select-sm" v-model="costs.Uom" @change="changeUom(index, costs.Uom)">
                      <Option v-for="option in UomOptions" :value="option.value" :key="option.value">{{ option.label }}</Option>
                  </select>
                </td>
                <td>
                  <AtomInput
                    class="form-control form-control-sm"
                    type="text"
                    @change="ChangeTotal(index)"
                    v-model="costs.UnitPrice"
                    placeholder="Unit Price"
                  />
                </td>
                <td>
                  <AtomInput
                    class="form-control form-control-sm"
                    type="text"
                    @change="ChangeTotal(index)"
                    v-model="costs.Discount"
                  />
                </td>
                <td>
                  <AtomInput
                    class="form-control form-control-sm"
                    type="text"
                    @change="ChangeTotal(index)"
                    v-model="costs.Vat"
                  />
                </td>
                <td>
                  <font-awesome-icon
                    :icon="['fas', 'right-long']"
                    size="lg"
                    style="color: #adadad"
                  />
                </td>
                <td>
                  <select class="form-select form-select-sm" v-model="costs.Currency" @change="changeCurrency(index, costs.Currency)">
                      <Option v-for="option in CurrencyOptions" :value="option.value" :key="option.value">{{ option.label }}</Option>
                  </select>
                </td>
                <td class="text-end">
                  <label>{{ formatNumber(costs.VatAmount) }}</label>
                </td>
                <td class="text-end">
                  <label>{{ formatNumber(costs.SubTotal) }}</label>
                </td>
                <td class="text-end">
                  <label>{{ formatNumber(costs.Total) }}</label>
                </td>
                <td>
                  <select class="form-select form-select-sm" v-model="costs.ChargeTo" @change="changeChargeTo(index, costs.ChargeTo)">
                      <Option v-for="option in ChargeToOptions" :value="option.value" :key="option.value">{{ option.label }}</Option>
                  </select>
                </td>
                <td>
                  <AtomButtonIcons class="btn btn-sm btn-bd-primary" @click="addCost" type="button" icons="fa-solid fa-plus"/>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" rowspan="2">
                  <div class="row d-flex align-items-center">
                    <div class="col-auto">
                      <label>Exchange Rate 1 USD =</label>
                    </div>
                    <div class="col-3 m-0 p-0">
                      <AtomInput
                        class="form-control form-control-sm right-align-input"
                        type="text"
                        @change="ChangeExchangeRate(params.ExchangeRate)"
                        v-model="params.ExchangeRate"
                      />
                    </div>
                    <div class="col-auto">
                      <label>AED</label>
                    </div>
                  </div>
                </td>
                <td colspan="3" rowspan="2"></td>
                <td class="table-light">
                  <label>AED in Total</label>
                </td>
                <td class="table-light text-end">
                 
                  <label>{{ formatNumber(params.GrandVatAmountAed) }}</label>
                </td>
                <td class="table-light text-end">
                 
                  <label>{{ formatNumber(params.GrandSubAed) }}</label>
                </td>
                <td class="table-light text-end">
                 
                  <label>{{ formatNumber(params.GrandTotalAed) }}</label>
                </td>
                <td colspan="1" rowspan="2"></td>
                <td rowspan="2">
                  <AtomButtonIcons class="btn btn-sm btn-bd-primary" @click="minCost" type="button" icons="fa-solid fa-minus"/>
                </td>
              </tr>
              <tr>
                <td class="table-light">
                  <label>USD in Total</label>
                </td>
                <td class="table-light text-end">
                  <label>{{ formatNumber(params.GrandVatAmountUsd) }}</label>
                </td>
                <td class="table-light text-end">
                  <label>{{ formatNumber(params.GrandSubUsd) }}</label>
                </td>
                <td class="table-light text-end">
                  <label>{{ formatNumber(params.GrandTotalUsd) }}</label>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AtomInput from "./atom/AtomInput.vue";
import AtomButtonIcons from "./atom/AtomButtonIcons.vue";
import axios from "axios";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "CostDetai",
  components: {
    AtomInput,
    AtomButtonIcons
  },
  props:{
    submit:null,
    typeEvent:String
  },
  watch:{
    submit:{
      handler(newVal, oldVal){
        if (newVal != oldVal) {
          if (this.typeEvent == 'submit') {
            this.submitEvent()
          }
          else if (this.typeEvent == 'cancel') {
            this.CancelEvent()
          }
          else {
            this.SavetoDraft()
          }
        }
      },
      deep:true
    },
  },
  data: () => {
    return {
      inputDisabled: true,
      UomOptions: [],
      CurrencyOptions: [],
      ChargeToOptions: [],
      tempCurrencySelected : 1
    };
  },
  computed: {
    ...mapGetters(['GetDatas']),
    params() {
      return this.GetDatas;
    },
  },
  mounted() {
    this.getUom();
    this.getCurrency();
    this.getCharge();
  },
  methods: {
    ...mapMutations(['SetDatas']),
    formatNumber(newValue){
        return newValue.toFixed(2);
    },
    submitEvent() {
      //set validation
      let panjang = this.$store.getters.GetDatas.Cost.length;
      for (let i = 0; i < panjang; i++) {
        if (this.$store.getters.GetDatas.Cost[i].Qty == null) {
          alert ('Qty Is Required');
          return;
        }
        if (this.$store.getters.GetDatas.Cost[i].UnitPrice == null) {
          alert ('Unit Price Is Required');
          return;
        }
      }
      const newParams = {
        Cost: this.$store.getters.GetDatas.Cost,
        ExchangeRate: this.$store.getters.GetDatas.ExchangeRate,
        GrandVatAmountAed: this.$store.getters.GetDatas.GrandVatAmountAed,
        GrandVatAmountUsd: this.$store.getters.GetDatas.GrandVatAmountUsd,
        GrandSubAed: this.$store.getters.GetDatas.GrandSubAed,
        GrandSubUsd: this.$store.getters.GetDatas.GrandSubUsd,
        GrandTotalAed: this.$store.getters.GetDatas.GrandTotalAed,
        GrandTotalUsd: this.$store.getters.GetDatas.GrandTotalUsd,
        Type: "submit",
      };
      this.$store.commit('SetDatas', newParams);
      console.log(this.$store.getters.GetDatas.Cost);
      Swal.fire({
        title: 'Success!',
        text: 'Success Inserted Data',
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      })
    },
    SavetoDraft(){
        const newParams = {
          Cost: this.$store.getters.GetDatas.Cost,
          ExchangeRate: this.$store.getters.GetDatas.ExchangeRate,
          GrandVatAmountAed: this.$store.getters.GetDatas.GrandVatAmountAed,
          GrandVatAmountUsd: this.$store.getters.GetDatas.GrandVatAmountUsd,
          GrandSubAed: this.$store.getters.GetDatas.GrandSubAed,
          GrandSubUsd: this.$store.getters.GetDatas.GrandSubUsd,
          GrandTotalAed: this.$store.getters.GetDatas.GrandTotalAed,
          GrandTotalUsd: this.$store.getters.GetDatas.GrandTotalUsd,
          Type: "save to draft",
        };
        this.$store.commit('SetDatas', newParams);
        console.log(this.$store.getters.GetDatas.Cost);
        Swal.fire({
          title: 'Success!',
          text: 'Success Save To Draft Data',
          icon: 'success',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        })
    },
    CancelEvent(){
      const newParams = {
        ExchangeRate: 1000,
        GrandVatAmountAed : 0,
        GrandVatAmountUsd : 0,
        GrandSubAed : 0,
        GrandSubUsd : 0,
        GrandTotalAed : 0,
        GrandTotalUsd : 0,
        Type: null,
        Cost : [
          {
            Description: null,
            Qty: null,
            Uom: '1',
            UnitPrice: null,
            Discount: 0,
            Vat: 0,
            Currency: '1',
            VatAmount: 0,
            SubTotal: 0,
            Total: 0,
            ChargeTo: '1',
          },
          {
            Description: null,
            Qty: null,
            Uom: '1',
            UnitPrice: null,
            Discount: 0,
            Vat: 0,
            Currency: '1',
            VatAmount: 0,
            SubTotal: 0,
            Total: 0,
            ChargeTo: '1',
          }
        ]
      }
      this.$store.commit('SetToNullData', newParams);
      console.log(this.$store.getters.GetDatas.Cost);
      Swal.fire({
        title: 'Success!',
        text: 'Success Deleted Data in Vuex',
        icon: 'success',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      })
    },
    ChangeTotal(index){
        let QtyChange = Number(this.$store.getters.GetDatas.Cost[index].Qty)
        let UnitPriceChange = Number(this.$store.getters.GetDatas.Cost[index].UnitPrice)
        let DiscountChange = Number(this.$store.getters.GetDatas.Cost[index].Discount)
        let VatChange = Number(this.$store.getters.GetDatas.Cost[index].Vat)

        let CurrencyChange = this.$store.getters.GetDatas.Cost[index].Currency;
        let hasil = QtyChange * UnitPriceChange;
        if (CurrencyChange == '2') {
            hasil = hasil * this.$store.getters.GetDatas.ExchangeRate
        }
        if (DiscountChange != 0) {
          hasil -= hasil * (DiscountChange / 100);
        }
        let vathasil = 0;
        if (VatChange != 0) {
            vathasil = hasil * (VatChange / 100);
        }
        let HasilTotal = hasil + vathasil;
        const newParams = {
          HasilData: hasil,
          VatHasilData: vathasil,
          HasilTotal: HasilTotal,
          Index: index,
        };

        this.$store.commit('SetDataTotal', newParams);
        this.ChangeGrandTotal();
    },
    ChangeGrandTotal(){
        let panjang = this.$store.getters.GetDatas.Cost.length;
        let GrandVatAmountUsd = 0;
        let GrandVatAmountAed = 0;
        let GrandSubTotalUsd = 0;
        let GrandSubTotalAed = 0;
        let GrandTotalUsd = 0;
        let GrandTotalAed = 0;
        for (let i = 0; i < panjang; i++) {
          if (this.$store.getters.GetDatas.Cost[i].Currency == '1') {
            GrandVatAmountUsd += this.$store.getters.GetDatas.Cost[i].VatAmount
            GrandSubTotalUsd += this.$store.getters.GetDatas.Cost[i].SubTotal
            GrandTotalUsd += this.$store.getters.GetDatas.Cost[i].Total
          }
          else{
            GrandVatAmountAed += this.$store.getters.GetDatas.Cost[i].VatAmount
            GrandSubTotalAed += this.$store.getters.GetDatas.Cost[i].SubTotal
            GrandTotalAed += this.$store.getters.GetDatas.Cost[i].Total
          }
        }
        const newParams = {
          GrandVatAmountUsd: GrandVatAmountUsd,
          GrandSubTotalUsd: GrandSubTotalUsd,
          GrandTotalUsd: GrandTotalUsd,
          GrandVatAmountAed: GrandVatAmountAed,
          GrandSubTotalAed: GrandSubTotalAed,
          GrandTotalAed: GrandTotalAed,
        }
        this.$store.commit('SetTotalValue', newParams);
        
    },
    ChangeExchangeRate(newValue){
      this.$store.commit('SetExchangeRate', newValue);
    },
    changeCurrency(index, newvalue){
        const newParams = {
          Index: index,
          NewValue: newvalue
        };
        this.ChangeTotal(index)
        this.$store.commit('SetCurrency', newParams);
    },
    changeUom(index,newvalue){
        const newParams = {
            Index: index,
            NewValue: newvalue
        };
        this.$store.commit('SetUom', newParams);
    },
    changeChargeTo(index,newvalue){
        const newParams = {
            Index: index,
            NewValue: newvalue
        };
        this.$store.commit('SetChargeTo', newParams);
    },
    addCost() {
      this.$store.getters.GetDatas.Cost.push({
          Description: null,
          Qty: null,
          Uom: '1',
          UnitPrice: null,
          Discount: 0,
          Vat: 0,
          Currency: '1',
          VatAmount: 0,
          SubTotal: 0,
          Total: 0,
          ChargeTo: '1',
      })
    },
    minCost() {
      if (this.$store.getters.GetDatas.Cost.length > 1) {
        this.$store.getters.GetDatas.Cost.pop()
      }
      else{
        Swal.fire({
          title: 'Warning!',
          text: 'Form must have at least 1 row',
          icon: 'warning',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          },
        })
      }
    },
    async getCurrency() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/backend/getCurrency")
        this.CurrencyOptions = response.data.map((res)=>({
            value: res.id,
            label: res.alias
        }))
      } catch (error) {
        console.log(error)
      }
    },
    async getUom() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/backend/getUom")
        this.UomOptions = response.data.map((res)=>({
            value: res.id,
            label: res.name
        }))
      } catch (error) {
        console.log(error)
      }
    },
    async getCharge() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/backend/getCharge")
        this.ChargeToOptions = response.data.map((res)=>({
            value: res.id,
            label: res.name
        }))
      } catch (error) {
        console.log(error)
      }
    },
  },
};
</script>

<style scoped>
  tfoot tr td .form-control:disabled{
    background-color : #f8f9fa;
    border: 0;
    min-height: calc(1em + 0.5rem + calc(var(--bs-border-width) * 2));
    font-size:0.6rem;
  }
  tbody tr td .form-control{
    font-size:0.8rem;
  }
  tbody tr td .form-select{
    font-size:0.8rem;
  }
  tbody tr td label{
    font-size:0.8rem;
  }
</style>



