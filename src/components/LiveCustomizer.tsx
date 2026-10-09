{/* Bottom Actions: Pricing, Quantity & Add to Cart */}
              <div className="mt-8 border-t border-stone-100 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-3xl font-semibold text-stone-900">
                        ${currentProduct.basePrice * quantity}
                      </span>
                    </div>
                    <span className="text-xs text-stone-600">
                      Includes precision laser etching & gift wrapping
                    </span>
                  </div>
                  {/* Quantity selector */}
                  <div className="flex items-center rounded-xl border border-stone-200 bg-stone-50 p-1">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-stone-600 shadow-2xs hover:bg-stone-100">-</button>
                    <span className="w-8 text-center text-xs font-semibold text-stone-800">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-stone-600 shadow-2xs hover:bg-stone-100">+</button>
                  </div>
                </div>
                {/* Direct Checkout CTA */}
                <button
                  onClick={() => onAddToCart(currentProduct, customization, quantity)}
                  className="relative flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 py-4 text-sm font-medium tracking-wide text-white shadow-lg transition-all hover:bg-stone-800 active:scale-[0.99]"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Proceed to Checkout - ${(currentProduct.basePrice * quantity).toFixed(2)}</span>
                </button>
              </div>
