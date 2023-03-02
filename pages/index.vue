<template>
 <v-container>
    <v-row>
        <v-col cols="12">
            <v-card>
                <v-card-title>
                    <h1>Products</h1>
                </v-card-title>
                <v-card-text>
                    <v-list v-if="$vuetify.breakpoint.smAndDown">
                        <v-list-item
                            v-for="item in products"
                            :key="item.id"
                        >
                            <v-list-item-content>
                                <v-list-item-title>{{ item.name }} {{ item.description }}</v-list-item-title>
                                <v-list-item-subtitle>Price: {{ item.price }} €</v-list-item-subtitle>
                                <v-list-item-subtitle>Stock: {{ item.stock }} €</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn
                                    icon
                                    @click="addToCart(item)"
                                >
                                    <v-icon>mdi-cart</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>
                    <v-data-table
                        v-else
                        :headers="headers"
                        :items="products"
                        :items-per-page="5"
                        class="elevation-1"
                    >
                        <template v-slot:item.price="{ item }">
                            <span>{{ item.price }} €</span>
                        </template>
                        <template v-slot:item.stock="{ item }">
                            <span>{{ item.stock }} pcs</span>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-btn
                                color="primary"
                                @click="addToCart(item)"
                            >
                                Add to cart
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
    <v-row v-if="email">
        <v-col cols="12">
            <v-card>
                <v-card-title>
                    <h1>Cart</h1>
                </v-card-title>
                <v-card-text>
                    <v-list v-if="$vuetify.breakpoint.smAndDown">
                        <v-list-item
                            v-for="item in cart"
                            :key="item.id"
                        >
                            <v-list-item-content>
                                <v-list-item-title>{{ item.item.name }} {{ item.description }}</v-list-item-title>
                                <v-list-item-subtitle>{{ item.item.price }} €</v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn
                                    icon
                                    @click="removeItemFromCart(item)"
                                >
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>                    
                    <v-data-table
                        v-else
                        :headers="cartHeaders"
                        :items="cart"
                        :items-per-page="5"
                        class="elevation-1"
                    >
                        <template v-slot:item.price="{ item }">
                            <span>{{ item.price }} €</span>
                        </template>
                        <template v-slot:item.stock="{ item }">
                            <span>{{ item.stock }} pcs</span>
                        </template>
                        <template v-slot:item.actions="{ item }">
                            <v-btn
                                color="primary"
                                @click="removeItemFromCart(item)"
                            >
                                Remove from cart
                            </v-btn>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
 </v-container>
</template>

<script>
// import vuex-map-fields and vuex
import { mapFields } from 'vuex-map-fields'
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'Index',
    data() {
        return {
            // headers for the product table, name, description, price and stock
            headers: [
                { text: 'Name', value: 'name' },
                { text: 'Description', value: 'description' },
                { text: 'Price', value: 'price' },
                { text: 'Stock', value: 'stock' },
                // headers for adding to cart
                { text: 'Actions', value: 'actions', sortable: false },
            ],

            // headers for cart table, which has the same fields as the product table except stock
            cartHeaders: [
                { text: 'Name', value: 'item.name' },
                { text: 'Description', value: 'item.description' },
                { text: 'Price', value: 'item.price' },
                { text: 'Stock', value: 'item.stock' },
                // headers to remove from cart
                { text: 'Actions', value: 'actions', sortable: false },
            ],
        }
    },

    // when mounted, retrieve produts and the cart if email is set
    created () {
        this.getProducts()
        if (this.email) {
            this.getCart()
        }
    },

    computed: {
        // map vuex fields to computed properties
        ...mapFields(['products', 'email']),
        ...mapGetters(['cart'])
    },

    methods: {
        // map vuex actions to methods
        ...mapActions(['getProducts', 'getCart', 'addToCart', 'removeItemFromCart'])
    }
}
</script>