<?php

namespace App\Handler;

use App\Type\JsonResponseType;

class JsonResponseHandler
{
    public static function setStatus(int $status)
    {
        return (new _JsonResponseHandler())->setStatus($status);
    }
    public static function setCode(string $code)
    {
        return (new _JsonResponseHandler())->setCode($code);
    }
    public static function setMessage(string $message)
    {
        return (new _JsonResponseHandler())->setMessage($message);
    }
    public static function setResult($result)
    {
        return (new _JsonResponseHandler())->setResult($result);
    }
}
class _JsonResponseHandler
{
    private int $status = 200;
    private string $code = JsonResponseType::SUCCESS;
    private string $message = '';
    private $result = null;


    public function setStatus(int $status)
    {
        $this->status = $status;
        return $this;
    }
    public function setCode(string $code)
    {
        $this->code = $code;
        return $this;
    }
    public function setMessage(string $message)
    {
        $this->message = $message;
        return $this;
    }
    public function setResult($result)
    {
        $this->result = $result;
        return $this;
    }
    public function send()
    {
        $jsonData = [
            'status' => $this->status,
            'code' => $this->code,
            'message' => $this->message,
            'result' => $this->result
        ];
        return response()->json($jsonData, $this->status);
    }
}
