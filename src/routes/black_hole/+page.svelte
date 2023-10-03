<script>

  import dragon from '$lib/images/logo.svg'
  import { onMount } from 'svelte';
  import * as THREE from 'three';

  let amount = 1

  let start_positions = Array(amount).fill(0)
  let start_t_values = Array(amount).fill(performance.now()/1000)
  let t_values = Array(amount).fill(70)

  let angle_change = (2*Math.PI)/amount
  let angle = -angle_change

  let positions = []

  start_positions = start_positions.map((_, i) => {
    angle += angle_change
    let vec = new THREE.Vector2((Math.sin(angle)/2.5 + 0.5)*100, (Math.cos(angle)/2.5 + 0.5)*100)
    positions[i] = new THREE.Vector2()
    positions[i].copy(vec)
    return vec
  })

  let center = new THREE.Vector2(50, 50)

  onMount(() => {

    let frame = requestAnimationFrame(loop);

    function loop(timestamp) {
      frame = requestAnimationFrame(loop);
      if (timestamp > 10000) {
        return
      }
      console.log(timestamp)
      timestamp = timestamp*0.001

      positions = start_positions.map((position, i) => {
        let t = (timestamp - start_t_values[i])/t_values[i]
        if (t > 1) {
          t = 1
        }

        console.log(t)
        return position.lerp(center, t)
      })
      console.log(positions, start_positions)
    }

    return () => {
      cancelAnimationFrame(frame);
    };
  });
</script>


<div class="h-full w-full">
  {#each positions as position}
    <img src="{dragon}" alt="" style="left: {position.x}%; top: {position.y}%;" class="w-12 h-12 absolute">
  {/each}
</div>