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
                <th width="15%" scope="col">Charge To</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(costs, index) in cost" :key="index">
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
                    type="number"
                    v-model="costs.Qty"
                    placeholder="Qty"
                  />
                </td>
                <td>
                  <AtomSelect
                    class="form-select form-select-sm"
                    v-model="costs.Uom"
                    :options="UomOptions"
                  />
                </td>
                <td>
                  <AtomInput
                    class="form-control form-control-sm"
                    type="text"
                    v-model="costs.UnitPrice"
                    placeholder="Unit Price"
                  />
                </td>
                <td>
                  <AtomInput
                    class="form-control form-control-sm"
                    type="text"
                    v-model="costs.Discount"
                  />
                </td>
                <td>
                  <AtomInput
                    class="form-control form-control-sm"
                    type="text"
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
                  <AtomSelect
                    class="form-select form-select-sm"
                    v-model="costs.Currency"
                    :options="CurrencyOptions"
                  />
                </td>
                <td>
                  <AtomInput
                    class="form-control form-control-sm right-align-input"
                    type="text"
                    v-model="costs.VatAmount"
                    :isDisabled="inputDisabled"
                  />
                </td>
                <td>
                  <AtomInput
                    class="form-control form-control-sm right-align-input"
                    type="text"
                    v-model="costs.SubTotal"
                    :isDisabled="inputDisabled"
                  />
                </td>
                <td>
                  <AtomInput
                    class="form-control form-control-sm right-align-input"
                    type="text"
                    v-model="costs.Total"
                    :isDisabled="inputDisabled"
                  />
                </td>
                <td>
                  <AtomSelect
                    class="form-select form-select-sm"
                    v-model="costs.ChargeTo"
                    :options="ChargeToOptions"
                  />
                </td>
                <td>
                  <button class="btn btn-sm btn-bd-primary" @click="addCost">
                    <font-awesome-icon
                      :icon="['fas', 'plus']"
                      style="color: #ffffff"
                    />
                  </button>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="4" rowspan="2">
                  <div class="row d-flex align-items-center">
                    <div class="col-auto">
                      <AtomLabel labelText="Exchange Rate 1 USD =" />
                    </div>
                    <div class="col-3 m-0 p-0">
                      <AtomInput
                        class="form-control form-control-sm right-align-input"
                        type="text"
                        v-model="ExchangeRate"
                      />
                    </div>
                    <div class="col-auto"><AtomLabel labelText="UAD" /></div>
                  </div>
                </td>
                <td colspan="3" rowspan="2"></td>
                <td class="table-light">
                  <AtomLabel labelText="AED in Total" />
                </td>
                <td class="table-light">0</td>
                <td class="table-light">0</td>
                <td class="table-light">0</td>
                <td colspan="1" rowspan="2"></td>
                <td rowspan="2">
                  <button class="btn btn-sm btn-bd-primary" @click="minCost">
                    <font-awesome-icon
                      :icon="['fas', 'minus']"
                      style="color: #ffffff"
                    />
                  </button>
                </td>
              </tr>
              <tr>
                <td class="table-light">
                  <AtomLabel labelText="AUD in Total" />
                </td>
                <td class="table-light">0</td>
                <td class="table-light">0</td>
                <td class="table-light">0</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AtomSelect from "./atom/AtomSelect.vue";
import AtomInput from "./atom/AtomInput.vue";
import AtomLabel from "./atom/AtomLabel.vue";
import axios from "axios";

export default {
  name: "CostDetai",
  components: {
    AtomInput,
    AtomSelect,
    AtomLabel,
  },
  data() {
    return {
      cost : [
          {
            inputDisabled: true,
            Description: null,
            Qty: null,
            Uom: null,
            UomOptions: [
              { value: "red", label: "Red" },
              { value: "blue", label: "Blue" },
              { value: "green", label: "Green" },
            ],
            UnitPrice: null,
            Discount: 0,
            Vat: 0,
            Currency: null,
            CurrencyOptions: [],
            VatAmount: 0,
            VatAmountTotalUsd: 0,
            VatAmountTotalUad: 0,
            SubTotal: 0,
            Total: 0,
            ChargeTo: null,
            ChargeToOptions: [
              { value: "red", label: "Red" },
              { value: "blue", label: "Blue" },
              { value: "green", label: "Green" },
            ],
            ExchangeRate: 36725,
          },
          {
            inputDisabled: true,
            Description: null,
            Qty: null,
            Uom: null,
            UomOptions: [
              { value: "red", label: "Red" },
              { value: "blue", label: "Blue" },
              { value: "green", label: "Green" },
            ],
            UnitPrice: null,
            Discount: 0,
            Vat: 0,
            Currency: null,
            CurrencyOptions: [],
            VatAmount: 0,
            VatAmountTotalUsd: 0,
            VatAmountTotalUad: 0,
            SubTotal: 0,
            Total: 0,
            ChargeTo: null,
            ChargeToOptions: [
              { value: "red", label: "Red" },
              { value: "blue", label: "Blue" },
              { value: "green", label: "Green" },
            ],
            ExchangeRate: 36725,
          },
      ]
    };
  },
  mounted() {
    this.getCurrency();
    this.getUom();
    this.getCharge();
  },
  methods: {

    addCost() {
      this.cost.push(
        {
            inputDisabled: true,
            Description: null,
            Qty: null,
            Uom: null,
            UomOptions: [
              { value: "red", label: "Red" },
              { value: "blue", label: "Blue" },
              { value: "green", label: "Green" },
            ],
            UnitPrice: null,
            Discount: 0,
            Vat: 0,
            Currency: null,
            CurrencyOptions: [],
            VatAmount: 0,
            VatAmountTotalUsd: 0,
            VatAmountTotalUad: 0,
            SubTotal: 0,
            Total: 0,
            ChargeTo: null,
            ChargeToOptions: [
              { value: "red", label: "Red" },
              { value: "blue", label: "Blue" },
              { value: "green", label: "Green" },
            ],
            ExchangeRate: 36725,
          }
        );
    },

    minCost(){
      this.cost.pop();
    },
    getCurrency() {
      axios
      .get("http://127.0.0.1:8000/api/backend/getCurrency")
      .then(function (response) {
        let arr = []
        response.data.forEach(element => {
          arr.push({
              value: element.id,
              label: element.alias,
          })
        });
        console.log(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    getUom(){
      axios
      .get("http://127.0.0.1:8000/api/backend/getUom")
      .then(function (response) {
        let arr = []
        response.data.forEach(element => {
          arr.push({
              value: element.id,
              label: element.name,
          })
        });
        console.log(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
    },

    getCharge(){
      axios
      .get("http://127.0.0.1:8000/api/backend/getCharge")
      .then(function (response) {
        let arr = []
        response.data.forEach(element => {
          arr.push({
              value: element.id,
              label: element.name,
          })
        });
        console.log(arr);
      })
      .catch(function (error) {
        console.log(error);
      });
    },
  },
};
</script>



