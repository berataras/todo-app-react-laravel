<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function getTasks(Request $request){
        $task = new Task();
        $user = User::find($request->user);
        $paginate = 10;

        if ($user->is_admin){
            return $task->latest()->paginate($paginate);
        }else{
            return $task->where('user', $request->user)->latest()->paginate($paginate);
        }
    }

    public function store(Request $request){
        $task = new Task();
        $task->user = $request->user;
        $task->todo = $request->todo;
        $task->save();
    }

    public function update(Request $request){
        $task = Task::find($request->id);
        $task->todo = $request->todo;
        $task->save();
    }

    public function delete($id){
        Task::find($id)->delete();
    }
}
