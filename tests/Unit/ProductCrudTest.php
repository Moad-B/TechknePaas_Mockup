<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductCrudTest extends TestCase
{
    use RefreshDatabase;

    public function testBasic()
    {


        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
