<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    <style>
        .bg-custom {
            background-image: url('https://images.unsplash.com/photo-1586228541224-3fc6365e9cb8?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg4OXwwfDF8c2VhY3JlfHx8Y29tcGxldGV8ZW58MHx8fHwxNjg4OTM1MjU4&ixlib=rb-1.2.1&q=80');
            background-size: cover;
            background-position: center;
        }
    </style>
</head>
<body>
    <main class="h-screen flex items-center justify-center bg-gradient-to-r from-blue-700 to-blue-800">
        <div class="bg-custom w-full h-full relative">
            <div class="absolute bg-gradient-to-b from-black to-transparent opacity-70 inset-0"></div>
            
            <div class="min-h-screen flex justify-center items-center">
                <div class="flex flex-col sm:flex-row w-full max-w-4xl p-5 sm:p-10 z-10">
                    <div class="flex flex-col justify-center sm:w-1/2 px-4 mb-10 sm:mb-0">
                        <h1 class="font-extrabold text-4xl sm:text-5xl text-white mb-3">Bienvenido</h1>
                        <p class="text-lg text-white opacity-80">Inicia sesión .</p>
                    </div>
                    
                    <div class="flex justify-center sm:w-1/2 z-10">
                        <div class="p-12 bg-white rounded-3xl shadow-lg w-full max-w-md">
                            <div class="mb-6">
                                <h3 class="font-semibold text-2xl text-gray-800">Iniciar sesión</h3>
                                <p class="text-sm text-gray-500">Por favor, ingresa tus credenciales</p>
                            </div>
                            
                            <form method="POST" action="{{ route('login') }}" class="space-y-6">
                                @csrf
                                <!-- Email input -->
                                <div class="space-y-3">
                                    <label class="text-sm font-medium text-gray-700">Correo electrónico</label>
                                    <input name="email" type="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        placeholder="email@gmail.com" required>
                                </div>

                                <!-- Password input -->
                                <div class="space-y-3">
                                    <label class="text-sm font-medium text-gray-700">Contraseña</label>
                                    <input name="password" type="password" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                        placeholder="Ingresa tu contraseña" required>
                                </div>

                                <!-- Remember me and forgot password -->
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center">
                                        <input id="remember_me" name="remember" type="checkbox" class="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded">
                                        <label for="remember_me" class="ml-2 text-sm text-gray-800">Recuerdame</label>
                                    </div>
                                    <a href="#" class="text-sm text-blue-400 hover:text-blue-500">¿Olvidaste tu contraseña?</a>
                                </div>

                                <!-- Submit button -->
                                <div>
                                    <button type="submit" 
                                        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full tracking-wide font-semibold shadow-lg transition ease-in duration-200">
                                        Iniciar sesión
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</body>
</html>
