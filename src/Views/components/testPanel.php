<?php
?>
<div id="testPanel" class="test-panel">
  <button class="test-panel-toggle" aria-label="Pokaż/ukryj panel testowy">
    Panel testowy 🧪
  </button>
  <div class="test-panel-content" style="display: none;">
    <div class="test-buttons">
      <button onclick="window.errorHandler.testApiError()" class="test-button">
        Test błędu API
      </button>
      <button onclick="window.errorHandler.testValidationError()" class="test-button">
        Test błędu walidacji
      </button>
      <button onclick="window.errorHandler.testTimeoutError()" class="test-button">
        Test timeout
      </button>
    </div>
  </div>
</div>
