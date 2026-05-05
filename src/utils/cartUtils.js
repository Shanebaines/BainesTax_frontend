/**
 * Cart Utility Functions
 * Manages cart operations: add, remove, update quantity, retrieve, clear
 * Stores cart data in localStorage per customer (using email)
 */

const CART_STORAGE_KEY = 'baines_wear_cart'

/**
 * Get customer email from localStorage user data
 * @returns {string|null} Customer email or null
 */
function getCustomerEmail() {
  try {
    const user = localStorage.getItem('user')
    if (user) {
      const userData = JSON.parse(user)
      return userData.email
    }
  } catch (e) {
    console.error('Error parsing user data:', e)
  }
  return null
}

/**
 * Get the storage key for current customer's cart
 * @returns {string} Storage key for customer cart
 */
function getCartKey() {
  const email = getCustomerEmail()
  return email ? `${CART_STORAGE_KEY}_${email}` : CART_STORAGE_KEY
}

/**
 * Get entire cart from localStorage
 * @returns {Array} Cart items array
 */
export function getCart() {
  try {
    const cartKey = getCartKey()
    const cartData = localStorage.getItem(cartKey)
    return cartData ? JSON.parse(cartData) : []
  } catch (error) {
    console.error('Error reading cart from localStorage:', error)
    return []
  }
}

/**
 * Save cart to localStorage
 * @param {Array} cart - Cart items to save
 */
function saveCart(cart) {
  try {
    const cartKey = getCartKey()
    localStorage.setItem(cartKey, JSON.stringify(cart))
    // Dispatch custom event so header updates in real-time
    window.dispatchEvent(new Event('cartUpdated'))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

/**
 * Add product to cart or increase quantity if already exists
 * @param {Object} product - Product object with id, name, price, image
 * @param {number} quantity - Quantity to add
 */
export function addToCart(product, quantity = 1) {
  if (!product || !product.productID) {
    throw new Error('Invalid product data')
  }

  if (quantity <= 0) {
    throw new Error('Quantity must be greater than 0')
  }

  const cart = getCart()
  const existingItem = cart.find((item) => item.productID === product.productID)

  if (existingItem) {
    existingItem.quantity += quantity
  } else {
    cart.push({
      productID: product.productID,
      productName: product.productName,
      price: product.price,
      quantity,
      image: Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : '',
      category: product.category || '',
      stock: product.stock || 0,
    })
  }

  saveCart(cart)
  return cart
}

/**
 * Remove product from cart by productID
 * @param {string} productID - Product ID to remove
 */
export function removeFromCart(productID) {
  let cart = getCart()
  cart = cart.filter((item) => item.productID !== productID)
  saveCart(cart)
  return cart
}

/**
 * Update quantity of product in cart
 * Auto-removes product if quantity <= 0
 * @param {string} productID - Product ID
 * @param {number} newQuantity - New quantity value
 */
export function updateCartQuantity(productID, newQuantity) {
  let cart = getCart()
  const item = cart.find((item) => item.productID === productID)

  if (!item) {
    throw new Error('Product not found in cart')
  }

  if (newQuantity <= 0) {
    return removeFromCart(productID)
  }

  item.quantity = newQuantity
  saveCart(cart)
  return cart
}

/**
 * Get cart total price
 * @returns {number} Total price
 */
export function getCartTotal() {
  const cart = getCart()
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
}

/**
 * Get cart item count (sum of quantities)
 * @returns {number} Total items in cart
 */
export function getCartItemCount() {
  const cart = getCart()
  return cart.reduce((count, item) => count + item.quantity, 0)
}

/**
 * Get cart count (number of different products)
 * @returns {number} Number of different products
 */
export function getCartProductCount() {
  const cart = getCart()
  return cart.length
}

/**
 * Clear entire cart
 */
export function clearCart() {
  const cartKey = getCartKey()
  localStorage.removeItem(cartKey)
  return []
}

/**
 * Check if product is in cart
 * @param {string} productID - Product ID
 * @returns {boolean} True if in cart
 */
export function isProductInCart(productID) {
  const cart = getCart()
  return cart.some((item) => item.productID === productID)
}

/**
 * Get cart item by productID
 * @param {string} productID - Product ID
 * @returns {Object|null} Cart item or null if not found
 */
export function getCartItem(productID) {
  const cart = getCart()
  return cart.find((item) => item.productID === productID) || null
}
