<?php

namespace App\Type;

class JsonResponseType
{
    const SUCCESS = 'SUCCESS';
    const ERROR = 'ERROR';
    const VALIDATION_ERROR = 'VALIDATION_ERROR';
    const NOT_FOUND = 'NOT_FOUND';
    const INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR';
}