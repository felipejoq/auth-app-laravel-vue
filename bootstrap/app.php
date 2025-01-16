<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {

    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Manejo de 401 (No autorizado)
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException $e, $request) {
            return response()->json([
                'error' => 'Unauthorized',
                'message' => 'You must provide a valid token.',
            ], 401);
        });

        // Manejo de 404 (No encontrado)
        $exceptions->render(function (\Symfony\Component\HttpKernel\Exception\NotFoundHttpException $e, $request) {
            return response()->json([
                'error' => 'Not Found',
                'message' => 'The resource you are looking for does not exist.',
            ], 404);
        });

        // Renderizar excepciones de servidor para API
        $exceptions->shouldRenderJsonWhen(function ($request, Throwable $e) {
            return $request->is('api/*');
        });

        $exceptions->render(function (Throwable $e, $request) {
            return response()->json([
                'error' => 'Server Error',
                'message' => $e->getMessage(),
            ], 500);
        });

        // Excepciones que no deben ser reportadas
        $exceptions->dontReport([
            \Illuminate\Validation\ValidationException::class,
            \Symfony\Component\HttpKernel\Exception\NotFoundHttpException::class,
        ]);
    })->create();
