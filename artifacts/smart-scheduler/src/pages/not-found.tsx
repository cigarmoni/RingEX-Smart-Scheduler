import { Block, BlockHeader, Alert } from "@ringcentral/spring-ui";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-b1">
      <div className="w-full max-w-md mx-4">
        <Block padding borderRadius="medium">
          <BlockHeader>404 Page Not Found</BlockHeader>
          <Alert severity="error">
            Did you forget to add the page to the router?
          </Alert>
        </Block>
      </div>
    </div>
  );
}
