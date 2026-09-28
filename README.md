# Campus Connect

Módulo web académico para solicitudes universitarias, recursos y reportes.

- [Página pública del proyecto](https://Piedra69.github.io/campus-connect/)
- [Aplicación con base de datos](https://campus-connect-universidad.danielrocapadilla.chatgpt.site)

## Arquitectura actual

React y Vinext, endpoints del servidor y Cloudflare D1 (SQLite). La aplicación está alojada por separado y conserva su acceso privado. GitHub Pages publica el portal y los documentos; no ejecuta la API ni la base de datos.

El diseño académico propone Laravel/PostgreSQL. La implementación actual utiliza otra tecnología y no satisface literalmente esas restricciones.

## Desarrollo

Requiere Node.js 22.13 o superior y pnpm. Instalar con `pnpm install`, generar migraciones con `pnpm db:generate` y compilar con `pnpm build`. El entorno del servidor debe proporcionar el enlace D1 `DB` y aplicar las migraciones de `drizzle/` antes de atender peticiones. No contiene credenciales de producción.

## Documentación

`docs/design/` incluye el informe en PDF y diagramas editables en Dia. El historial Git conserva las etapas de construcción y revisiones.

## Estado

CRUD de solicitudes, cambio de estado, responsables, consulta de recursos y exportación CSV. No incluye autenticación propia por roles ni gestión completa de archivos. Las pruebas de `tests/domain.test.mjs` corresponden al prototipo inicial y requieren adaptación a la versión del servidor.
