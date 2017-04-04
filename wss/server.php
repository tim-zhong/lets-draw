<?php
require "Websockets/websockets.php";


global $db;
class Server extends WebSocketServer{

	private $_connecting = "connecting to server...";
	private $_welcome = 'Hello, welcome to echo server!!';
	private $_rsuccess = 'Saber has been registered!';
	private $_gsuccess = 'Saber has been found!';
	protected $users = array();

	protected function connected($user){
		foreach($this->users as $u){
			if($u->id == $user->id){
				$msg = "Hello".$user->id.", welcome onboard!";
				
				$ids = array();
				foreach($this->users as $u){
					array_push($ids, $u->id);
				}

			} else {
				$msg = $user->id.' is onboard';

				$ids = array($user->id);
			}

			$arr = array(
				"cmd"=>"message",
				"val"=>$msg
			);

			$data = json_encode($arr);
			$this->send($u,$data);

			//tell every user to add a stroke
			//$ids = self::createobjstr($ids);
			$arr = array(
				"cmd"=>"addstrokes",
				"val"=>$ids
			);
			$data = json_encode($arr);
			$this->send($u,$data);
		}
	}

	protected function process($user,$message){
		$obj = json_decode($message);
		if($obj->cmd == 'drawing'){
			$obj->id = $user->id;
		}
		$arr = array(
			"cmd"=>"drawing",
			"val"=>$obj
		);
		$data = json_encode($arr);
		foreach($this->users as $u){
			$this->send($u,$data);
		}
	}

	protected function closed($user){
		foreach($this->users as $u){
			$arr = array(
				"cmd"=>"message",
				"val"=>$user->id.' has disconnected'
			);

			$data = json_encode($arr);
			$this->send($u,$data);

			$arr = array(
				"cmd"=>"removestroke",
				"val"=>$user->id
			);
			$data = json_encode($arr);
			$this->send($u,$data);
		}
	}

	public function __destruct(){
		echo "Server destroyed ".PHP_EOL;
	}

	protected function createobjstr($arr){
		$result = "{";
		foreach($arr as $key=>$value){
			$result.='"'.$key.'":"'.$value.'",';
		}
		$result=rtrim($result, ",");
		$result .= "}";
		return $result;
	}

	protected function randstr($n){
		return substr(substr("abcdefghijklmnopqrstuvwxyz" ,mt_rand(0,25), 1).substr(md5(time()), 1),0,$n);
	}
}

// $addr = 'ec2-52-37-132-185.us-west-2.compute.amazonaws.com';
// $port = '9697';
$addr = 'localhost';
$port = '9697';

$server = new Server($addr,$port);
$server->run();
