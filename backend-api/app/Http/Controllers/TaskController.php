<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Mews\Purifier\Facades\Purifier;
use Symfony\Component\HttpFoundation\Response;

class TaskController extends Controller
{

    public function index(Request $request)
    {
        $dateRange = $request->date_range ?? [];
        $query = Task::query();
        $query->select('id', 'task', 'is_completed', 'created_by', 'created_at');

        if(!empty($dateRange)){
            if(count($dateRange) > 1){
                $dateRange = [$dateRange[0], $dateRange[1]];
            }else{
                $dateRange = [$dateRange[0], $dateRange[0]];
            }
            $query->whereBetween(DB::raw('DATE(created_at)'), $dateRange);
        }
        $tasks = $query->orderBy('created_at', 'DESC')->get();

        $tasksGrouped = $tasks->groupBy(function ($task) {
            return $task->created_at->format('Y-m-d');
        });
        $response = $tasksGrouped->map(function ($tasks, $date) {
            return [
                'date' => $date,
                'tasks' => $tasks->values(),
            ];
        })->values();

        return response()->json([
            'status' => 'success',
            'message' => 'Tasks retrieved successfully.',
            'tasks' => $response,
        ], Response::HTTP_OK);
    }

    public function create(Request $request)
    {
        $authUser = Auth::user();
        $validated = Validator::make($request->only('task'), [
            'task' => 'required|string'
        ])->validate();

        $taskPayload = [
            'task' => Purifier::clean($validated['task']),
            'created_by' => $authUser->id
        ];

        Task::create($taskPayload);

        return response()->json([
            'status' => 'success',
            'message' => 'Task created successfully.'
        ], Response::HTTP_CREATED);
    }

    public function show($id)
    {
        $task = Task::select('id', 'task')->where('id', $id)->first();

        return response()->json([
            'status' => 'success',
            'message' => 'Task retrieved successfully.',
            'task' => $task,
        ], Response::HTTP_OK);
    }

    public function update(Request $request, $id)
    {
        $authUser = Auth::user();
        $validated = Validator::make($request->only('task'), [
            'task' => 'required|string'
        ])->validate();

        $taskPayload = [
            'task' => Purifier::clean($validated['task']),
            'updated_by' => $authUser->id
        ];

        Task::where('id', $id)->update($taskPayload);

        return response()->json([
            'status' => 'success',
            'message' => 'Task updated successfully.'
        ], Response::HTTP_OK);
    }

    public function delete($id)
    {
        $task = Task::where('id', $id)->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Task deleted successfully.'
        ], Response::HTTP_OK);
    }

    public function updateStatus(Request $request, $id)
    {
        $authUser = Auth::user();
        $validated = Validator::make($request->only('is_completed'), [
            'is_completed' => 'required|boolean'
        ])->validate();

        $taskPayload = [
            'is_completed' => $validated['is_completed'],
            'updated_by' => $authUser->id,
        ];
        $task = Task::findOrFail($id);
        $task->update($taskPayload);

        return response()->json([
            'status' => 'success',
            'message' => 'Task status updated',
        ], Response::HTTP_OK);
    }
}
