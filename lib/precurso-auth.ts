/**
 * CONFIGURACIÓN DE ACCESO AL PRECURSO
 *
 * Contraseña compartida para todos los alumnos.
 * Cámbiala aquí cuando quieras dar acceso a una nueva cohorte.
 */

export const PRECURSO_PASSWORD = '1raEdic0n'

/**
 * Verifica si la contraseña es correcta
 */
export function verifyPrecursoPassword(password: string): boolean {
  return password === PRECURSO_PASSWORD
}
