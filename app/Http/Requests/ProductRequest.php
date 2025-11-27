<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest{
    public function rules()
    {
        return [
            'name' => ['required'],
'description' => ['nullable'],
'quantity' => ['required', 'integer'],
'price' => ['required', 'numeric'],//
        ];
    }

    public function authorize()
    {
        return true;
    }
}
