import { NextResponse, type NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    const token = request.cookies.get("token");
  
    // Verify the token on the server-side
    if (token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  
    // If the token is valid, proceed to the requested route
    return NextResponse.next();
}
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}