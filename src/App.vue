<template>
  <section>
    <div class="container mx-auto justify-center">
      <div class="w-full mx-auto max-w-md">
        <div class="mt-8 mb-5 text-center flex justify-center">
          <img class="w-48" src="@/assets/logo.svg" alt="Accela Register">
        </div>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4" @submit.prevent="handleSubmit">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0 relative">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                First Name
              </label>
              <input v-model="user.firstName" class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Sara" :class="{ 'is-invalid': submitted && $v.user.firstName.$error }" >
              <img v-if="user.firstName" width="30" src="./assets/check_1.svg" class="pointer-events-none absolute inset-y-0 top-10 right-3 flex items-center px-2 text-gray-700" alt="">
              <p v-if="submitted && !$v.user.firstName.required" class="text-red-500 text-xs italic">Please fill out this field.</p>
            </div>
            <div class="w-full md:w-1/2 px-3 relative">
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Last Name
              </label>
              <input v-model="user.lastName" class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" :class="{ 'is-invalid': submitted && $v.user.lastName.$error }" id="grid-last-name" type="text" placeholder="Ahmad" >
              <img v-if="user.lastName" width="30" src="./assets/check_1.svg" class="pointer-events-none absolute inset-y-0 top-10 right-3 flex items-center px-2 text-gray-700" alt="">
              <p v-if="submitted && !$v.user.lastName.required" class="text-red-500 text-xs italic">Please fill out this field.</p>

            </div>
          </div>
          <div class="mb-6">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="gender">
              Gender
            </label>
            <div class="relative">
              <select id="gender" class="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >
                <option>Male</option>
                <option>Female</option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div class="mb-6">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="phone">
              Mobile No.
            </label>
            <div class="relative">
              <input v-model="user.mobile" id="phone" class="appearance-none block w-full text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" type="number" :class="{ 'is-invalid': submitted && $v.user.lastName.$error }" placeholder="962788571933">
              <img v-if="user.mobile && $v.user.mobile.minLength" width="30" src="./assets/check_1.svg" class="pointer-events-none absolute inset-y-0 top-4 right-0 flex items-center px-2 text-gray-700" alt="">
              <p v-if="submitted && !$v.user.mobile.required" class="text-red-500 text-xs italic">Please fill out this field.</p>
            </div>
          </div>
          <div class="mb-6">
            <label for="date" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Date of Birth
            </label>
            <div class="relative">
              <input id="date" @input="calcAge($event.target.value)" :max="today" v-model="user.dateBirth" class="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="date" placeholder="YYYY/MM/DD">
              <small v-if="user.dateBirth"> Happy <span class="text-green-500">{{formattedDate}}</span> old 🥳</small>
            </div>
          </div>
          <div class="mb-6">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="countries">
              Country of Citizenship
            </label>
            <div class="relative">
              <select id="countries" class="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option v-for="country of countries" :key="country.numericCode" :value="country.alpha2Code">
                  {{country.name}}
                </option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>

          </div>

          <div class="flex items-center justify-between">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Submit
            </button>
            <button @click="resetAll" type="reset" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Reset
            </button>
          </div>
        </form>
        <p class="text-center text-gray-500 text-xs">
          &copy;2021 Tawfeeq Amro. All rights reserved.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
  import {minLength, required, sameAs} from "vuelidate/lib/validators";
  import axios from 'axios';
  import moment from 'moment';

  export default {
    name: "app",
    data() {
      return {
        user: {
          firstName: "",
          lastName: "",
          mobile: "",
          password: "",
          confirmPassword: "",
          dateBirth: null
        },
        today: null,
        countries : [],
        submitted: false
      };
    },
    validations: {
      user: {
        firstName: { required },
        lastName: { required },
        mobile: { required, minLength: minLength(6)},
        password: { required, minLength: minLength(6) },
        confirmPassword: { required, sameAsPassword: sameAs('password') }
      }
    },
    created() {
      this.fetchData();
      this.today = moment().format('YYYY-MM-DD');
    },
    computed: {
      formattedDate() {

        return moment(this.user.dateBirth, 'YYYY/MM/DD').fromNow(true);
      }
    },
    methods: {
      fetchData() {
        axios.get('https://restcountries.eu/rest/v2/all').then(res => {
          this.countries = JSON.parse(JSON.stringify(res.data));
        }).catch( error =>  console.log(error));
      },
      calcAge(e) {
        // console.log(e);
        let a = moment();
        console.log(b);

        let b = moment(e, 'YYYY-MM-DD');

        return a.diff(b, 'years');
      },
      resetAll() {
       this.$v.$reset();
       this.submitted =false;

      },
      handleSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        this.$v.$touch();
        if (this.$v.$invalid) {
          return;
        }

        alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.user));
      }
    }
  };
</script>