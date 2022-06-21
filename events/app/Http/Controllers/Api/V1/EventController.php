<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller as Controller;
use Illuminate\Http\Request;
// use App\Http\Resources\EventCollection as EventCollection;
use App\Library\CustomResponse;
use App\Models\Event;
use Carbon\Carbon;
use App\Mail\MailEvent;
use Illuminate\Support\Facades\Validator;


class EventController extends Controller
{

    public function index()
    {
        $events = Event::paginate(5);

        return CustomResponse::content('SUCCESS', 'Events have been retrieved!', $events);
    }

    public function getActiveEvents()
    {
        $today = Carbon::today()->format('Y-m-d');
        $events = Event::where('startAt', '<=', $today)
            ->where('endAt', '>=', $today)
            ->paginate(5);

        return CustomResponse::content('SUCCESS', 'Active events have been retrieved!', $events);
    }

    public function show($id)
    {
        $event = Event::findorFail($id);
        return CustomResponse::content('SUCCESS', 'Event has been retrieved!', $event);
    }

    public function store(Request $request)
    {
        try {
            $event = Event::create($request->all());
            \Mail::to('lav29.deva@gmail.com')->send(new MailEvent()); 
        } catch (Throwable $e) {
            report('Mailer failed'.$e);
        }
        

        return CustomResponse::content('SUCCESS', 'Event have been created!', $event);
    }

    public function update(Request $request, $id)
    {
        $event = Event::find($id);
        if(!is_null($event) && !empty($event)){
            $event->update($request->all());
        }else{
            $event = Event::create($request->all());
        }
        
        return CustomResponse::content('SUCCESS', 'Event has been updated!', $event);
    }

    public function updateEvent(Request $request, $id)
    {
        $event = Event::find($id);
        $event->update($request->all());
        return CustomResponse::content('SUCCESS', 'Event has been updated!', $event);
    }

    public function destroy($id)
    {
        $event = Event::findOrFail($id);
        $event->delete();
        return CustomResponse::content('SUCCESS', 'Event has been deleted!', $event);
    }

}
