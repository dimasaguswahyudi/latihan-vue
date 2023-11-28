import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    ExchangeRate: 1000,
    GrandVatAmountAed : 0,
    GrandVatAmountUsd : 0,
    GrandSubAed : 0,
    GrandSubUsd : 0,
    GrandTotalAed : 0,
    GrandTotalUsd : 0,
    Type: null,
    Cost: [
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
        Currency: '2',
        VatAmount: 0,
        SubTotal: 0,
        Total: 0,
        ChargeTo: '1',
      },
    ],
  },
  getters:{
    GetDatas:(state)=>({
        ExchangeRate : state.ExchangeRate,
        GrandVatAmountAed : state.GrandVatAmountAed,
        GrandVatAmountUsd : state.GrandVatAmountUsd,
        GrandSubAed : state.GrandSubAed,
        GrandSubUsd : state.GrandSubUsd,
        GrandTotalAed : state.GrandTotalAed,
        GrandTotalUsd : state.GrandTotalUsd,
        Type:state.Type,
        Cost : state.Cost
    }),
  },
  mutations: {
    SetDatas(state, newDatas){
      state.Cost = newDatas.Cost
      state.ExchangeRate = newDatas.ExchangeRate
      state.GrandVatAmountAed = newDatas.GrandVatAmountAed
      state.GrandVatAmountUsd = newDatas.GrandVatAmountUsd
      state.GrandSubAed = newDatas.GrandSubAed
      state.GrandSubUsd = newDatas.GrandSubUsd
      state.GrandTotalAed = newDatas.GrandTotalAed
      state.GrandTotalUsd = newDatas.GrandTotalUsd
      state.Type = newDatas.Type
    },
    SetToNullData(state, newValue){
      state.Cost = newValue.Cost
      state.ExchangeRate = newValue.ExchangeRate
      state.GrandVatAmountAed = newValue.GrandVatAmountAed
      state.GrandVatAmountUsd = newValue.GrandVatAmountUsd
      state.GrandSubAed = newValue.GrandSubAed
      state.GrandSubUsd = newValue.GrandSubUsd
      state.GrandTotalAed = newValue.GrandTotalAed
      state.GrandTotalUsd = newValue.GrandTotalUsd
      state.Type = newValue.Type
    },
    SetDataTotal(state, newValue){
      state.Cost[newValue.Index].SubTotal = newValue.HasilData
      state.Cost[newValue.Index].VatAmount = newValue.VatHasilData
      state.Cost[newValue.Index].Total = newValue.HasilTotal
    },
    SetCurrency(state, newCurrency){
      state.Cost[newCurrency.Index].Currency = newCurrency.NewValue
    },
    SetUom(state, newUom){
      state.Cost[newUom.Index].Uom = newUom.NewValue
    },
    SetChargeTo(state, newChargeTo){
      state.Cost[newChargeTo.Index].ChargeTo = newChargeTo.NewValue
    },
    SetExchangeRate(state, newValue){
      state.ExchangeRate = newValue
    },
    SetTotalValue(state, NewValue){
      state.GrandVatAmountUsd = NewValue.GrandVatAmountUsd
      state.GrandSubUsd = NewValue.GrandSubTotalUsd
      state.GrandTotalUsd = NewValue.GrandTotalUsd
      state.GrandVatAmountAed = NewValue.GrandVatAmountAed
      state.GrandSubAed = NewValue.GrandSubTotalAed
      state.GrandTotalAed = NewValue.GrandTotalAed
    }
  }
});