<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;
use Illuminate\Support\Str;
use Carbon\Carbon;
 

class EventFactory extends Factory
{
  
    /**
     * Define the model's default state.
     *
     * @return array
     */

    

    public function definition()
    {
        $today = Carbon::today();
        $start_date = Carbon::instance($this->faker->dateTimeBetween('-30 days','+30 days'));
        $start_date_clone = clone $start_date;
        $end_date = $this->faker->dateTimeBetween($start_date, $start_date_clone->modify('+5 days'));
    
            return [
                'id' => Str::uuid(),
                'name' => ucfirst($this->faker->word),
                'slug'=> $this->faker->slug,
                'startAt' => $start_date,
                'endAt' => $end_date
            ];
        
    }
}
