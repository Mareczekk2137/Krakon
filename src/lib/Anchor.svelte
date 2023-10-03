<script>
  export let top, left
</script>

<div class="anchor absolute w-full h-full" style="top: {top}%; left: {left}%; transform: translate({top}%, {left}%);">
  <slot/>
</div>

<style>
    .anchor > * {
      transform: translate(0%, 0%);
    }
</style>
