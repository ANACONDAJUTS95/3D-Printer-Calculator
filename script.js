// JavaScript code (no TypeScript)
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const filamentWeightInput = document.getElementById('filament-weight');
    const printTimeInput = document.getElementById('print-time');
    const complexitySelect = document.getElementById('complexity');
    const profitMarginInput = document.getElementById('profit-margin');
    const profitValueSpan = document.getElementById('profit-value');
    const calculateBtn = document.getElementById('calculate-btn');
    const toggleSettingsBtn = document.getElementById('toggle-settings');
    const advancedSettings = document.getElementById('advanced-settings');
    
    const filamentCostInput = document.getElementById('filament-cost');
    const electricityCostInput = document.getElementById('electricity-cost');
    const wearTearCostInput = document.getElementById('wear-tear-cost');
    const laborCostInput = document.getElementById('labor-cost');
    
    const materialCostSpan = document.getElementById('material-cost');
    const electricityResultSpan = document.getElementById('electricity-result');
    const wearTearResultSpan = document.getElementById('wear-tear-result');
    const laborResultSpan = document.getElementById('labor-result');
    const baseCostSpan = document.getElementById('base-cost');
    const marginResultSpan = document.getElementById('margin-result');
    const finalPriceSpan = document.getElementById('final-price');
    
    const presetButtons = document.querySelectorAll('.preset-button');
    
    // Update profit margin display
    profitMarginInput.addEventListener('input', function() {
      profitValueSpan.textContent = `${profitMarginInput.value}%`;
    });
    
    // Toggle advanced settings
    toggleSettingsBtn.addEventListener('click', function() {
      advancedSettings.classList.toggle('visible');
      toggleSettingsBtn.textContent = advancedSettings.classList.contains('visible') 
        ? 'Hide Advanced Settings' 
        : 'Advanced Settings';
    });
    
    // Calculate price
    function calculatePrice() {
      // Get input values
      const filamentGrams = parseFloat(filamentWeightInput.value);
      const printTime = parseFloat(printTimeInput.value);
      const complexity = complexitySelect.value;
      const profitMargin = parseFloat(profitMarginInput.value) / 100;
      
      // Get cost parameters
      const filamentCostPerGram = parseFloat(filamentCostInput.value);
      const electricityCostPerHour = parseFloat(electricityCostInput.value);
      const wearAndTearPerHour = parseFloat(wearTearCostInput.value);
      const laborCostPerHour = parseFloat(laborCostInput.value);
      
      // Calculate material cost
      const materialCost = filamentGrams * filamentCostPerGram;
      
      // Calculate operation costs
      const electricityCost = printTime * electricityCostPerHour;
      const wearTearCost = printTime * wearAndTearPerHour;
      
      // Apply complexity multiplier
      let complexityMultiplier = 1.0;
      if (complexity === "low") {
        complexityMultiplier = 0.8;
      } else if (complexity === "high") {
        complexityMultiplier = 1.5;
      }
      
      // Calculate labor cost
      const laborCost = printTime * laborCostPerHour * complexityMultiplier;
      
      // Calculate total cost
      const totalCost = materialCost + electricityCost + wearTearCost + laborCost;
      
      // Apply profit margin
      const profitAmount = totalCost * profitMargin;
      const finalPrice = totalCost + profitAmount;
      
      // Round to nearest 5 pesos
      const roundedPrice = Math.ceil(finalPrice / 5) * 5;
      
      // Update result elements
      materialCostSpan.textContent = `₱${materialCost.toFixed(2)}`;
      electricityResultSpan.textContent = `₱${electricityCost.toFixed(2)}`;
      wearTearResultSpan.textContent = `₱${wearTearCost.toFixed(2)}`;
      laborResultSpan.textContent = `₱${laborCost.toFixed(2)}`;
      baseCostSpan.textContent = `₱${totalCost.toFixed(2)}`;
      marginResultSpan.textContent = `₱${profitAmount.toFixed(2)} (${(profitMargin * 100).toFixed(0)}%)`;
      finalPriceSpan.textContent = `₱${roundedPrice.toFixed(2)}`;
    }
    
    // Calculate button click handler
    calculateBtn.addEventListener('click', calculatePrice);
    
    // Preset buttons click handlers
    presetButtons.forEach(button => {
      button.addEventListener('click', function() {
        const weight = this.getAttribute('data-weight');
        const time = this.getAttribute('data-time');
        const complexity = this.getAttribute('data-complexity');
        
        if (weight) filamentWeightInput.value = weight;
        if (time) printTimeInput.value = time;
        if (complexity) complexitySelect.value = complexity;
        
        calculatePrice();
      });
    });
    
    // Initial calculation
    calculatePrice();
  });